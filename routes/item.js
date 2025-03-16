'use strict'

var express =require('express');
var itemController = require('../controllers/item');
var routes =express.Router();
var token = require('../helpers/auth')

routes.post('/api/item',token.validateToken,itemController.createItem);// Login
routes.put('/api/item/:_id',token.validateToken,itemController.editItem);// Login
routes.delete('/api/item/:_id',token.validateToken,itemController.deleteItem);//Login
routes.get('/api/item/:_id',itemController.findItemById);
routes.get('/api/items',itemController.findAllItems);
routes.get('/api/items/:price',itemController.findItemsWithPriceEqualsTo);
routes.get('/api/items/:price/:name',itemController. findItemsByPriceAndName);
routes.get('/api/items/:price/or/:name',itemController. findItemsByPriceOrName);

module.exports=routes;