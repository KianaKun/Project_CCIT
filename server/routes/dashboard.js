// routes/dashboard.js
const express = require('express');
const router = express.Router();
const connection=require('../utils/database')
let changed=false;

router.get('/', (req, res) => {
    res.render('dashboard');
});

router.post('/logout', (req, res) => {
    const {statusLogin}=req.body;
    const query= 'UPDATE admins SET statusLogin = 0 WHERE statusLogin = 1';
    connection.query(query,[statusLogin],(err)=>{
        if(err){
            console.error(`Error executing query: ${err}`);
            return res.render('login', { error: 'Database error' });
        }
        if(changed==false){
            res.redirect('/login');
        }else{
            res.redirect('/login');
        }
    })
});

module.exports = router;
