const express = require('express');
const router = express.Router();
const connection = require('../utils/database');
let changed=true;

router.get('/', (req, res) => {
    res.render('login', { error: null });
});

router.post('/authentication', (req, res) => {
    const { id, passwords } = req.body;
    const { statusLogin } = req.body;
    const query = 'SELECT * FROM admins WHERE id = ? AND passwords = ?';
    const query2= 'UPDATE admins SET statusLogin = 1 WHERE statusLogin = 0';
    connection.query(query, [id, passwords], (err, results) => {
        if (err) {
            console.error(`Error executing query: ${err}`);
            return res.render('login', { error: 'Database error' });
        }
        if (results.length > 0) {
            connection.query(query2, [statusLogin], (err, results) => {
                if (err) {
                    console.error(`Error executing query: ${err}`);
                    return res.render('login', { error: 'Database error' });
                }
                if (changed==true) {
                    res.render('authentication');
                } else {
                    res.render('login-failed',{ error: 'Invalid username or password' });
                }
            });
        }else {
            res.render('login-failed',{ error: 'Invalid username or password' })
        }}
    )}
);

module.exports = router;