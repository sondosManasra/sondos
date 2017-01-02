var app=require('./../app.js');
var express = require('express')
var router = express.Router();

router.get('/loginfb',function(req,res){
    res.render('login');
});
module.exports=router;
