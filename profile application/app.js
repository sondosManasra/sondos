
var express=require('express');
var engines = require('consolidate');
var hbs=require('express-handlebars');

var bodyParser = require('body-parser').urlencoded({extended: true});
var app=express();
app.use(bodyParser);
var Path=require('path');
app.set('Views', Path.join(__dirname + '/Views'));
app.set('Model', Path.join(__dirname + '/Model'));
app.set('Model', Path.join(__dirname + '/controller'));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/Views'));
app.use(express.static(__dirname + '/Model'));
app.use(express.static(__dirname + '/controller'));

app.use(require('./controller/router.js'))


app.set('Views', __dirname + '/Views');
app.engine('hbs',hbs({extname:'hbs',layoutsDir:__dirname+'/Views'}));
app.set('view engine', 'hbs');


app.listen(3000, function () {
    console.log('profile app listening on port 3000!')
});