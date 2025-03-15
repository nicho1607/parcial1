'use strict'

var express =require('express');
var itemController = require('../controllers/item');
var routes =express.Router();

routes.post('/api/item',itemController.createItem);

module.exports=routes;