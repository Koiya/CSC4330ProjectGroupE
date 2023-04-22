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
            return new Promise((resolve,reject) => {
                connection.query(`INSERT INTO TutoringSystem.AccountInfo (name, email, password, role) VALUES ('${registerBody.name}', '${registerBody.email}', '${registerBody.password}', '${registerBody.role}')`
                    , (err, result) => {
                        if (err) {
                            reject(buildResponse('404',"Error with registering"));
                        } else {
                            resolve(buildResponse('200',"Registered"));
                        }
                    });
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
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TutoringSystem.TutorList`
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
                        email: verifyBody.username,
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