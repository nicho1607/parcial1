'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema =Schema({
    email:String,
    password:String,
    rol:String,
});

module.exports = mongoose.model('user',UserSchema);