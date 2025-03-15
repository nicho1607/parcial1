'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema =Schema({
    name:String,
    description:String,
    price:Number
});

module.exports = mongoose.model('item',ItemSchema);