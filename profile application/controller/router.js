
var app=require('./../app.js');
var express = require('express')
var router = express.Router();

router.use(express.static(__dirname + '/Model'));
router.use(require('./../Model/user.js'));
// router.use(require('./user.js'));

router.get('/',function(req,res){
    res.redirect('/insert');
});
router.get('/add',function(req,res){
    res.render('form');
});
router.get('/view',function(req,res,next){
    res.render('view');
});
router.get('/updateuser',function(req,res,next){
    res.render('updateuser');
});


module.exports=router;