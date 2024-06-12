const express = require('express');
const router = express.Router();
const connection = require('../utils/database');
const isLoggedIn = false;

router.get('/', (req, res) => {
    res.render('login', { error: null });
});

router.post('/dashboard', (req, res) => {
    const { id, passwords } = req.body;
    const query = 'SELECT * FROM admins WHERE id = ? AND passwords = ?';
    
    connection.query(query, [id, passwords], (err, results) => {
        if (err) {
            console.error(`Error executing query: ${err}`);
            return res.render('login', { error: 'Database error' });
        }
        if (results.length > 0) {
            isLoggedIn:true;
            res.render('dashboard');
        } else {
            res.render('login-failed',{ error: 'Invalid username or password' });
        }
    });
});

module.exports = router;
