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
        //GET TUTOR LIST
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
            //get user list
        case event['httpMethod'] === 'POST' && event['path'] === '/getUsers':
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TutoringSystem.AccountInfo`
                    , (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(buildResponse('200',results));
                        }
                    });
            });

        //GET TUTOR APT LIST
        case event['httpMethod'] === 'POST' && event['path'] === '/getTutorApt':
            const tutorBody = JSON.parse(event.body);
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TutoringSystem.TutorList WHERE tutorID = '${tutorBody.ID}'`
                    , (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(buildResponse('200',results));
                        }
                    });
            });

            //Remove listing for tutor
        case event['httpMethod'] === 'POST' && event['path'] === '/getTutorApt/remove':
            const removeBody = JSON.parse(event.body);
            return new Promise((resolve, reject) => {
                connection.query(`DELETE FROM TutoringSystem.TutorList WHERE tutorID = '${removeBody.tutorID}' AND id = '${removeBody.aptID}'`
                    , (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(buildResponse('200',"Deleted"));
                        }
                    });
            });
        //GET MESSAGES
        case event['httpMethod'] === 'POST' && event['path'] === '/getmessage':
            const messageBody = JSON.parse(event.body);
            return new Promise((resolve, reject) => {
                const findMessageQueryForTutor = `SELECT * FROM TutoringSystem.Messages WHERE receiver_id = '${messageBody.ID}'`;
                const findMessageQueryForUser = `SELECT * FROM TutoringSystem.Messages WHERE sender_id = '${messageBody.ID}' AND status = "Pending";`;
                //Get user appointment list
                if (messageBody.role === 'user') {
                    connection.query(findMessageQueryForUser,
                        (err, results) => {
                            if (err) {
                                reject(err);
                            }
                            resolve(buildResponse('200', results));
                        });
                }//Get tutor list
                else if(messageBody.role ==='tutor'){
                    connection.query(findMessageQueryForTutor,
                        (err, results) => {
                            if (err) {
                                reject(err);
                            }
                            resolve(buildResponse('200', results));
                        });
                }
                else{
                    resolve(buildResponse('404',"Error"));
                }
            });

        //SEND MESSAGES
        case event['httpMethod'] === 'POST' && event['path'] === '/sendMessage':
            const sendMessageBody = JSON.parse(event.body);
            return await new Promise((resolve, reject) => {
                const sendMessageQuery = `INSERT INTO TutoringSystem.Messages(sender_id,receiver_id,student_name,tutor_name,expertise,message_time,message,status) 
                                         VALUES ('${sendMessageBody.userID}', '${sendMessageBody.tutorID}','${sendMessageBody.studentName}','${sendMessageBody.tutorName}','${sendMessageBody.expertise}', '${sendMessageBody.time}', '${sendMessageBody.message}', '${sendMessageBody.status}')`;
                const findMessageQuery = `SELECT * FROM TutoringSystem.Messages 
                                          WHERE sender_id = '${sendMessageBody.userID}' AND receiver_id = '${sendMessageBody.tutorID}' AND message_time = '${sendMessageBody.time}'`;
                //User is requesting apt
                if (sendMessageBody.userRole === 'user') {
                    connection.query(findMessageQuery, async (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        if (results.length === 0 ) {
                            let sendMessage = new Promise ((resolve,reject) =>{
                                connection.query(sendMessageQuery, (err,res) => {
                                    if (err) {
                                        reject(err)
                                    } else {
                                        resolve(buildResponse('200', "Appointment requested"));
                                    }
                                })
                            })
                            let messageRes = await sendMessage;
                            resolve(messageRes);
                        } else {
                            resolve(buildResponse('404', "Appointment cannot be requested"));
                        }
                    });
                    //Tutor replying
                }else if(sendMessageBody.role === 'tutor'){
                    const updateMessageQuery = `UPDATE TutoringSystem.Messages SET status = '${sendMessageBody.status}' WHERE messageID = '${sendMessageBody.messageID}'`
                    const insertAptQuery = `INSERT INTO TutoringSystem.Appointments(student_id,tutor_id,student_name,tutor_name,appointment_time,appointment_subject) 
                                            VALUES ('${sendMessageBody.studentID}', '${sendMessageBody.tutorID}','${sendMessageBody.studentName}','${sendMessageBody.tutorName}','${sendMessageBody.time}','${sendMessageBody.expertise}')`
                    connection.query(updateMessageQuery, async (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        let insertApt = new Promise ((resolve,reject) => {
                            connection.query(insertAptQuery, (err, results) => {
                                if (err) {
                                    reject(err);
                                }
                                resolve(buildResponse('200', "Replied"))
                            })
                        })
                        let insertAptRes = await insertApt;
                        resolve(insertAptRes);
                    })
                }else{
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
        //List APT
        case event['httpMethod'] === 'POST' && event['path'] === '/getApt':
            const getAptBody = JSON.parse(event.body);
            return await new Promise((resolve, reject) => {
                //const createAptQuery = `INSERT INTO TutoringSystem.TutorList(tutorID,tutorName,email,tutorExpertise,tutorTime) VALUES ('${aptBody.ID}','${aptBody.name}', '${aptBody.email}', '${aptBody.expertise}','${aptBody.time}')`;
                let getAptList = `SELECT * FROM TutoringSystem.Appointments`;
                if (getAptBody.role === "user") {
                    getAptList = `SELECT * FROM TutoringSystem.Appointments WHERE student_id = '${getAptBody.ID}' AND status = 0`;
                }
                if (getAptBody.role === "tutor") {
                    getAptList = `SELECT * FROM TutoringSystem.Appointments WHERE tutor_id = '${getAptBody.ID}'`;
                }
                connection.query(getAptList, (err, results) => {
                    if (err) {
                        reject(err);
                    }else {
                        resolve(buildResponse('200', results));
                    }
                });
            });
        //tutor change apt status to complete
        case event['httpMethod'] === 'POST' && event['path'] === '/getApt/complete':
            const aptCompleteBody = JSON.parse(event.body);
            return await new Promise((resolve, reject) => {
                if (aptCompleteBody.role === "tutor" || aptCompleteBody.role === "admin") {
                    let updateAptList = `UPDATE TutoringSystem.Appointments SET status = 1 WHERE tutor_id = '${aptCompleteBody.tutorID}' AND student_id = '${aptCompleteBody.studentID}' AND appointment_time = '${aptCompleteBody.time}' AND appointment_subject = '${aptCompleteBody.expertise}'`;
                    connection.query(updateAptList, (err, results) => {
                        if (err) {
                            reject(err);
                        }else {
                            resolve(buildResponse('200', "Appointment status changed."));
                        }
                    });
                }else{
                    reject();
                }
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