const express = require('express');
const router = express.Router();

router.get('/login',(req,res)=>{
    res.render('authentication');
})

module.exports=router;