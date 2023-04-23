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
                            const userInfo = {
                                username: loginBody.email,
                                name: loginBody.name
                            }
                            const loginToken = generateToken(userInfo);
                            const response = {
                                email: results[0].email,
                                name: results[0].name,
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