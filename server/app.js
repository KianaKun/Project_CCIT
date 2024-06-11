// app.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./utils/database');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/appointment', (req, res) => {
    res.render('form');
});

app.post('/appointment/submit', (req, res) => {
    const { name, gender, phone, birthdate, address, email, complain, meetingDate } = req.body;
    const query = 'INSERT INTO form (name, gender, phone, birthdate, address, email, complain, meetingDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [name, gender, phone, birthdate, address, email, complain, meetingDate], (err, result) => {
        if (err) {
            console.error(`Error Mengisi Data: ${err}`);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Data berhasil di input');
        res.redirect('/information');
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/information', (req, res) => {
    res.render('information');
});

app.listen(port, () => {
    console.log(`Server berhasil dijalankan di http://localhost:${port}`);
});
