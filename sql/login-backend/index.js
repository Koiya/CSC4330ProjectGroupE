const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    port     : process.env.PORT,
    database: process.env.DB
});
exports.handler = async (event) => {
    switch(true){
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
        case event['httpMethod'] === 'POST' && event['path'] === '/login':
            const loginBody = JSON.parse(event.body);
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TutoringSystem.AccountInfo WHERE email = '${loginBody.email}' AND password = '${loginBody.password}'`
                    , (err, results) => {
                        if (err) {
                            reject(err);
                        } else if(results.length > 0){
                            resolve(buildResponse('200',results));
                        }else{
                            resolve(buildResponse('200',"Wrong Email/Password"))
                        }
                    });
            });
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