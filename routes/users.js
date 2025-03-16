'use strict'

var express = require('express');
var UserController = require('../controllers/users');
var routes = express.Router();

routes.post('/api/user',UserController.createUser);
routes.post('/api/login',UserController.loginUser);

module.exports = routes;