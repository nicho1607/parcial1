'use strict'

var mongoose = require('mongoose');
var application = require('./application')

mongoose.connect('mongodb://127.0.0.1:27017/parcial1').then(
    () => {
        console.log("Database connection succesful. Starting application");
        application.listen(6542,function(){
            console.log("Application stated ");
        })
    },
    err =>{
        console.log("Error when concecting to database. Application not started")
    }
)