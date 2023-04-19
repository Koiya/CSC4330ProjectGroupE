const mysql = require('mysql');
const {response} = require("express");

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
        case event.httpMethod === 'POST' && event.path === '/register':
            const registerBody = JSON.parse(event.body);
            response = buildResponse('200');
            connection.query(`INSERT INTO TutoringSystem.AccountInfo (email, password) VALUES ('${registerBody.email}', '${registerBody.password}')`
                , (err, result) => {
                if(err){
                    console.log(err);
                }
            }
            break;
        case event.httpMethod === 'POST' && event.path === '/login':
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM TutoringSystem.AccountInfo WHERE email = '${username}' AND password = '${password}'`, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log(event);
                        resolve(results.length > 0 ? { success: true } : { success: false });
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
        body: JSON.stringify(body)
    }

}
