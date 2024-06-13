// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const form = require('./routes/form');
const login = require('./routes/login');
const dashboard = require('./routes/dashboard');
const requireLogin = require('./routes/requireLogin');
const auth = require('./routes/auth');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // Pastikan ini ada untuk menyajikan file statis
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/appointment', form);
app.use('/login', login);
app.use('/auth', auth);
app.use('/dashboard', requireLogin, dashboard);

app.use((req, res, next) => {
    res.status(404).render('404', { message: 'Hayo mau ngapain?' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
