var app=require('./../app.js');
var express = require('express')
var router = express.Router();
var mongodb=require('mongodb');
var assert = require('assert');

var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url='mongodb://localhost:27017/test';

router.use(require('./index.js'));

router.post('/search',function(req,res,next){
    MongoClient.connect(url,function (err,db) {
        assert.equal(null, err);
        var cursor= db.collection('data-user').findOne({'name':req.body.searchInput},function(err,result){
            assert.equal(null, err);
         db.close();
res.render('usersearch',result);
        });
    });
    });
router.get('/insert',function(req,res,next){
    var resultArray=[];
    MongoClient.connect(url,function (err,db) {
        assert.equal(null,err);
        var cursor= db.collection('data-user').find();
        cursor.forEach(function(doc,err){
            assert.equal(null, err);
            resultArray.push(doc);

        },function(){
            db.close();
            res.render('list',{user:resultArray});
// res.send(resultArray);
        });

    });
});
router.post('/insert',function(req,res,next){
var user={
    name:req.body.name,
    email:req.body.email,
     phone:req.body.phone
};
MongoClient.connect(url,function (err,db) {
    assert.equal(null,err);
db.collection('data-user').insertOne(user,function (err,result) {
    assert.equal(null,err);
    console.log('user inserted');
    db.close();
});
res.redirect('/insert');
});
});
router.post('/update',function(req,res,next){
    var user={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        id:req.body.id
    };
    MongoClient.connect(url,function (err,db) {
        assert.equal(null,err);
        db.collection('data-user').updateOne({"id":user.id},{$set:user},function (err,result) {
            assert.equal(null,err);
            console.log('user updated');
            db.close();
        });res.redirect('/insert');
    });
});
router.get('/delete',function(req,res,res){
    var user={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        id:req.body.id
    };
    MongoClient.connect(url,function (err,db) {
        assert.equal(null,err);
        db.collection('data-user').deleteOne({"id":user.id},function (err,result) {
            assert.equal(null,err);
            console.log('user deleted');
        },function(){
            db.close();
            res.redirect('/insert');
// res.send(resultArray);
        });
    });
});

module.exports=router;