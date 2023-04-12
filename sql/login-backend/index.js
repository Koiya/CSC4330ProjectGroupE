const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host     : "groupe4330.cpu1s6muiayj.us-east-2.rds.amazonaws.com",
    user     : "admin",
    password : "1!p*sMr44",
    port     : 3306,
    database: "TutoringSystem"
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

/*const register = () => {
    Axios.post("URL", {
        fullName:name,
        username:email,
        password:pass,
    }).then( (response) => {
        console.log(response);
    });
};*/