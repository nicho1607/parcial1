'use strict'

const item = require("../models/item");
var Item =require("../models/item");

function createItem(req,resp){
    var ItemReqBody =req.body;
    if(ItemReqBody.user.rol !=='admin'){
        return resp.status(403).send({'message':'You do not have permission to create items'});
    }

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

function editItem(req,resp){
    var itemToEdit = req.params._id;
    var itemNewValues =req.body;
    if(itemNewValues.user.rol !=='admin'){
        return resp.status(403).send({'message':'You do not have permission to edit items'});
    }

    var item =new Item();

    item._id=itemToEdit;
    item.name = itemNewValues.name;
    item.description = itemNewValues.description;
    item.price= itemNewValues.price;

    Item.findByIdAndUpdate(item._id,item).then(
        (editedItem) =>{
            resp.status(200).send({'messge':'Item was edited succesfully','item':editedItem});
        },
        err=>{
            resp.status(500).send({'message':'An error ocurred while editing the item','error':err});
        }
    );

}

function deleteItem(req,resp){
    var itemToDelete = req.params._id;
    var itemBody= req.body;
    if(itemBody.user.rol !=='admin'){
        return resp.status(403).send({'message':'You do not have permission to delete items'});
    }

    Item.findByIdAndDelete(itemToDelete).then(
        (deletedItem) =>{
            resp.status(200).send({'messge':'Item was delete succesfully','item':deletedItem});
        },
        err=>{
            resp.status(500).send({'message':'An error ocurred while delete the item','error':err});
        }
    );
}

function findItemById(req,resp){
    var itemToFind = req.params._id;

    Item.findById(itemToFind).then(
        (foundItem) =>{
            resp.status(200).send({'item':foundItem});
        },
        err=>{
            resp.status(500).send({'message':'An error ocurred while searching the item','error':err});
        }
    );
}

function findAllItems(req,resp){
    Item.find({}).then(
        (foundItems) =>{
            resp.status(200).send({'item':foundItems});
        },
        err=>{
            resp.status(500).send({'message':'An error ocurred while searching the item','error':err});
        }
    );
}

function findItemsWithPriceEqualsTo(req,resp){
    var priceToFind = req.params.price;

    Item.find({price:priceToFind}).then(
        (foundItems) =>{
            resp.status(200).send({'item':foundItems});
        },
        err=>{
            resp.status(500).send({'message':'An error ocurred while searching the item','error':err});
        }
    );
}

function findItemsByPriceAndName(req,resp){
    var priceToFind = req.params.price;
    var nameToFind = req.params.name;

    Item.find(
            {
                price: {$gt: priceToFind},
                name: {$regex: nameToFind}
            }
        ).then(
        (foundItems) =>{
            resp.status(200).send({'item':foundItems});
        },
        err=>{
            resp.status(500).send({'message':'An error ocurred while searching the item','error':err});
        }
    );
}

function findItemsByPriceOrName(req,resp){
    var priceToFind = req.params.price;
    var nameToFind = req.params.name;

    Item.find(
            {
                $or:[
                    {price: {$gt: priceToFind}},
                    {name: {$regex: nameToFind}}
                ]
            }
        ).then(
        (foundItems) =>{
            resp.status(200).send({'item':foundItems});
        },
        err=>{
            resp.status(500).send({'message':'An error ocurred while searching the item','error':err});
        }
    );
}


module.exports ={
    createItem,editItem,deleteItem,findItemById,findAllItems,findItemsWithPriceEqualsTo, findItemsByPriceAndName,findItemsByPriceOrName
}