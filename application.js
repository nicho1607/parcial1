'use strict'

var express=require('express');
var bodyParser =require('body-parser');
var routesItem=require('./routes/item');

var application = express();

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({'extended':false}));
application.use(routesItem);

module.exports=application;