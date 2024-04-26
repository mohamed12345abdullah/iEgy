const express=require('express');

const Router=express.Router();

const clientControler=require('../controler/clientControler')


Router.route('/register')
        .get(clientControler.register);   

module.exports=Router;        