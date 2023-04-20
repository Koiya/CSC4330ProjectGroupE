const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    port     : process.env.PORT,
    database: process.env.DB
});
exports.handler = async (event) => {
    let response;
    switch(true){
        case event['httpMethod'] === 'POST' && event['path'] === '/register':
            const registerBody = JSON.parse(event.body);
            return new Promise((resolve,reject) => {
                connection.query(`INSERT INTO TutoringSystem.AccountInfo (email, password) VALUES ('${registerBody.email}', '${registerBody.password}')`
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