'use strict'

var Item =require("../models/item");

function createItem(req,resp){
    var ItemReqBody =req.body;

    var newItem = new Item();
    newItem.name =ItemReqBody.name;
    newItem.description=ItemReqBody.description;
    newItem.price =ItemReqBody.price;

    if(newItem.name === null || newItem.name.trim()===''
    ||newItem.description === null || newItem.description.trim()===''
    ||newItem.price === null || newItem.price <=0){
        resp.status(400).send({'message':'One or more required variables were not sent'})
    }

    newItem.save().then(
        (savedItem) =>{
            resp.status(200).send({'message':'Item was created succesfully','item':savedItem})
        },
        err=>{
            resp.status(500).send({'message':'An error ocurred while creating the item','error':err})
        }
    );
}

module.exports ={
    createItem
}