const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require("dotenv").config();


const connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    port     : process.env.PORT,
    database: process.env.DB
});

exports.register = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const { username, password } = JSON.parse(event.body);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    connection.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (error, results) => {
            if (error) {
                console.error(error);
                return context.fail('Error inserting into database');
            }

            const token = jwt.sign({ id: results.insertId }, 'your-secret-key');

            context.succeed({
                statusCode: 200,
                body: JSON.stringify({ token })
            });
        }
    );
};

exports.login = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const { username, password } = JSON.parse(event.body);

    connection.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (error, results) => {
            if (error) {
                console.error(error);
                return context.fail('Error retrieving from database');
            }

            if (results.length === 0) {
                return context.fail('Invalid username or password');
            }

            const isMatch = await bcrypt.compare(password, results[0].password);

            if (!isMatch) {
                return context.fail('Invalid username or password');
            }

            const token = jwt.sign({ id: results[0].id }, 'your-secret-key');

            context.succeed({
                statusCode: 200,
                body: JSON.stringify({ token })
            });
        }
    );
};

// Set up the Lambda function with Express
const express = require('express');
const app = express();
app.use(bodyParser.json());

app.post('/register', register);
app.post('/login', login);

exports.handler = (event, context) => {
    const handler = app.listen(3000, () => {
        console.log('Server listening on port 3000');
        handler.close(() => {
            app.emit('close');
        });
    });

    context.callbackWaitsForEmptyEventLoop = false;

    return new Promise((resolve, reject) => {
        app.once('close', resolve);
        handler.once('error', reject);
    });
};
