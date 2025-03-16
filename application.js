'use strict'

var express=require('express');
var bodyParser =require('body-parser');
var routesItem=require('./routes/item');
var routesUser=require('./routes/users');


var application = express();

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({'extended':false}));
application.use(routesItem);
application.use(routesUser);//


module.exports=application;