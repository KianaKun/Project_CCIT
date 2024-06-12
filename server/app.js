const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const form = require('./routes/form');
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

app.use('/appointment',form);

app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(port, () => {
    console.log(`Server berhasil dijalankan di http://localhost:${port}`);
});
