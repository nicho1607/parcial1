'use strict'

var jwt = require('jwt-simple');
var moment= require('moment');

var secret ='klqweoih812f!asd';

function generateToken(user){
    var playload ={
        sub: user._id,
        email:user.email,
        iat : moment().unix(),
        exp : moment().add('10','minutes').unix()
    }
    return jwt.encode(playload,secret);
}

function validateToken(req,resp,nextStep){    
    try{
        var userToken = req.headers.authorization
        var clearToken= userToken.replace('Bearer','');
        var payload =jwt.decode(clearToken,secret);

        req.header.userId = payload.sub;//permite recordar quien fue el usuario logueado        
        nextStep();
    }
    catch(ex){
        resp.status(403).send({message:'Invalid token ' + ex})
    }
}

module.exports={ generateToken,validateToken}