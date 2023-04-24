const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    port     : process.env.PORT,
    database: process.env.DB
});

function generateToken(userInfo) {
    if(!userInfo){
        return null;
    }
    return jwt.sign(userInfo, process.env.TOKEN,{expiresIn:'1h'})
}

function verifyToken(username,token){
    return jwt.verify (token,process.env.TOKEN,{},(err, res) =>{
        if(err){
            return{
                verified: false,
                message: 'Invalid token'
            }
        }
        if (res.username !== username){
            return{
                verified: false,
                message: 'Invalid email'
            }
        }
        return{
            verified: true,
            message: 'Verified'
        }
    })
}

exports.handler = async (event) => {
    switch(true){
        // REGISTER
        case event['httpMethod'] === 'POST' && event['path'] === '/register':
            const registerBody = JSON.parse(event.body);
            return await new Promise((resolve,reject) => {
                const findQuery = `SELECT * FROM TutoringSystem.AccountInfo WHERE email = '${registerBody.email}'`;
                const insertQuery = `INSERT INTO TutoringSystem.AccountInfo (first_name, last_name, email, password, role) 
                                     VALUES ('${registerBody.first_name}', '${registerBody.last_name}', '${registerBody.email}', '${registerBody.password}', '${registerBody.role}')`;
                connection.query(findQuery, [registerBody.email], async (err,result) =>{
                    if(err){
                        reject(err);
                    }
                    if(result.length === 0) {
                        let createUser = new Promise((resolve,reject) => {
                            connection.query(insertQuery, (err, result) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(buildResponse('200', "Registered!"));
                                }
                            })
                        })
                        let response = await createUser;
                        resolve(response);
                    } else if (result[0].email === registerBody.email) {
                        resolve(buildResponse('404', "Email is already registered"));
                    } else{
                        resolve(buildResponse('404', "Error"));
                    }
                })
            });
        // LOGIN
        case event['httpMethod'] === 'POST' && event['path'] === '/login':
            const loginBody = JSON.parse(event.body);
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TutoringSystem.AccountInfo WHERE email = '${loginBody.email}' AND password = '${loginBody.password}'`
                    , (err, results) => {
                        if (err) {
                            reject(err);
                        } else if(results.length > 0){
                            const name = results[0].first_name + " " + results[0].last_name
                            const userInfo = {
                                username: loginBody.email,
                                name: name
                            }
                            const loginToken = generateToken(userInfo);
                            const response = {
                                id: results[0].id,
                                email: results[0].email,
                                name: name,
                                role: results[0].role,
                                token: loginToken
                            }
                            resolve(buildResponse('200',response));
                        }else{
                            resolve(buildResponse('404',"Wrong Email/Password"))
                        }
                    });
            });
        //GET TUTOR
        case event['httpMethod'] === 'POST' && event['path'] === '/getTutor':
            const userBody = JSON.parse(event.body);
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TutoringSystem.TutorList WHERE email LIKE '%${userBody.email}%'`
                    , (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(buildResponse('200',results));
                        }
                    });
            });
        //GET MESSAGES
        case event['httpMethod'] === 'POST' && event['path'] === '/getmessage':
            const messageBody = JSON.parse(event.body);
            return new Promise((resolve, reject) => {
                const addMessageQuery = `INSERT INTO TutoringSystem.Messages(sender_id,receiver_id,message_type,message_time,message) 
                                         VALUES '${messageBody.userId}', '${messageBody.tutorId}','${messageBody.expertise}', '${messageBody.time}', '${messageBody.message}'`;
                const findMessageQuery = `SELECT * FROM TutoringSystem.Messages WHERE sender_id = '${messageBody.userId}' AND receiver_id = '${messageBody.tutorId}'`;
                //User is requesting apt
                if (messageBody.userRole === 'user') {
                    connection.query(findMessageQuery,
                        (err, results) => {
                            if (err) {
                                reject(err);
                            } else if (results.length === 0 ) {
                                resolve(buildResponse('200', "Appointment requested"));
                            }
                        });
                    connection.query(addMessageQuery
                        , (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(buildResponse('200', "Appointment requested"));
                            }
                        });
                }//Tutor replying
                else if(messageBody.userRole ==='tutor'){

                }
                else{
                    resolve(buildResponse('404',"Error"));
                }
            });
            //Create APT
        case event['httpMethod'] === 'POST' && event['path'] === '/createApt':
            const aptBody = JSON.parse(event.body);
            return await new Promise((resolve, reject) => {
                const createAptQuery = `INSERT INTO TutoringSystem.TutorList(tutorID,tutorName,email,tutorExpertise,tutorTime) VALUES ('${aptBody.ID}','${aptBody.name}', '${aptBody.email}', '${aptBody.expertise}','${aptBody.time}')`;
                const findAptQuery = `SELECT * FROM TutoringSystem.TutorList WHERE tutorName = '${aptBody.name}' AND tutorTime = '${aptBody.time}'`;
                //CHECKS IF SAME TIME
                connection.query(findAptQuery, async (err, results) => {
                        if (err) {
                            reject(err);
                        } //IF NOT CREATE APT
                        if(results.length === 0){
                            let createApt = new Promise((resolve,reject) => {
                                connection.query(createAptQuery, (err,res) => {
                                    if (err){
                                        reject(err);
                                    }else {
                                        resolve(buildResponse('200', "Appointment has been created"))
                                    }
                                });
                            });
                            let aptRes = await createApt;
                            resolve(aptRes);
                        }else {
                            resolve(buildResponse('404', "Appointment cannot be created"));
                        }
                    });
            });
        //VERIFY
        case event['httpMethod'] === 'POST' && event['path'] === '/verify':
            const verifyBody = JSON.parse(event.body);
            return new Promise((resolve, reject) => {
                if (!verifyBody.token || !verifyBody.username || !verifyBody.name){
                    resolve(buildResponse('403',"Invalid body"))
                }
                const verification = verifyToken(verifyBody.username, verifyBody.token);
                if (!verification.verified){
                    resolve(buildResponse('401',verification));
                }
                resolve(buildResponse('200',
                    {
                        verified:true,
                        message:'Success',
                        user: verifyBody.username,
                        token: verifyBody.token
                    }));
            });
    }
};

function buildResponse(statusCode,body){
    return{
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    }

}