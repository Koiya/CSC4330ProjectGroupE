const express = require("express");
const mysql = require("mysql");
const app = express();
require("dotenv").config();

app.use(express.json());

const db = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    port     : process.env.PORT,
    database: process.env.DB
  });

app.post('/register',(req,res)=>{
    const username = req.body.username
    const password = req.body.password

    db.query("INSERT INTO AccountInfo (username,password) VALUES (?,?)", 
    [username, password], 
    (err,result) =>{
        console.log(err);
    });
});

app.post('/login', (req,res) =>{
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM AccountInfo WHERE username = ? AND password = ?", 
    [username, password], 
    (err,result) =>{
        if(err) {
            res.send({err:err});
        }
        if (result){
            res.send(result);
        } else {
            res.send({message:"Wrong username/password"});
        }
    }
    );
})

app.listen(3001, () => {
    console.log("Running server");
})