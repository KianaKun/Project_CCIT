const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

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