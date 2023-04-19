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
            connection.query(`INSERT INTO TutoringSystem.AccountInfo (email, password) VALUES ('${registerBody.email}', '${registerBody.password}')`
                , (err, result) => {
                if(err){
                    return (err);
                }
            });
            response = buildResponse('200');
            break;
        case event.httpMethod === 'POST' && event.path === '/login':
            const loginBody = JSON.parse(event.body);
            return new Promise((resolve, reject) => {
                response = buildResponse('200');
                connection.query(`SELECT * FROM TutoringSystem.AccountInfo WHERE email = '${loginBody.email}' AND password = '${loginBody.password}'`
                    , (err, results) => {
                    if (err) {
                        reject(err);
                    } else if(results.length > 0){
                        console.log(event);
                        resolve(results);
                    }else{
                        resolve({message: "Wrong pw"})
                    }
                });
            });
        default:

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

/*
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    port     : process.env.PORT,
    database: process.env.DB
});

exports.handler = async (event) => {
  const { username, password } = event;
  const query = `SELECT * FROM TutoringSystem.AccountInfo WHERE email = '${username}' AND password = '${password}'`;
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0 ? { success: event.path} : { success: false });
      }
    });
  });
};

exports.register = async (event) => {
  const { username, password } = event;
  const query = `INSERT INTO TutoringSystem.AccountInfo (email, password) VALUES ('${username}', '${password}')`;
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve({ success: true });
      }
    });
  });
};

 */