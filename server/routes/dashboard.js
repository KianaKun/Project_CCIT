// routes/dashboard.js
const express = require('express');
const router = express.Router();
const connection = require('../utils/database');

router.get('/', (req, res) => {
    // Query untuk menampilkan semua data dari tabel 'form'
    let query = 'SELECT * FROM form';

    // Jika terdapat query parameter meetingDate, filter berdasarkan tanggal
    const { meetingDate } = req.query;
    if (meetingDate) {
        query += ` WHERE meetingDate = '${meetingDate}'`;
    }

    connection.query(query, (err, results) => {
        if (err) {
            console.error(`Error executing query: ${err}`);
            return res.render('dashboard', { error: 'Database error' });
        }
        res.render('dashboard', { data: results, meetingDate });
    });
});

router.post('/logout', (req, res) => {
    const { statusLogin } = req.body;
    const query = 'UPDATE admins SET statusLogin = 0 WHERE statusLogin = 1';
    connection.query(query, [statusLogin], (err) => {
        if (err) {
            console.error(`Error executing query: ${err}`);
            return res.render('login', { error: 'Database error' });
        }
        res.redirect('/login');
    });
});

module.exports = router;
