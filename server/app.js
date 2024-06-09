const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const { connect } = require('http2');
const app = express();
const port = 3000;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'rumah_sakit'
});

connection.connect();

connection.connect(function(err){
    if(err){
        console.error(`connection error: ${err}`);
        return;
    }
    console.log(`Connected as id ${connection.threadId}`);
})

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/appointment',(req,res)=>{
    res.render('form')
})

app.listen(port,(req,res)=>{
    console.log(`Server berhasil dijalankan di http://localhost:${port}`);
});