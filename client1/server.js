var express      = require('express');
var app = express();
var bodyParser   = require("body-parser");
var passport = require('passport');
var morgan       = require('morgan');
var path = require('path');


//var social = require('./app/passport/passport')(app,passport);


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname + '/public/app/views/Index.html'));
});

app.listen(3001,function(){
    console.log('Running Server on port 3001');
});