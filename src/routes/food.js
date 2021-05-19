'use strict';
const express = require('express');
const router = express.Router();

const DataMngr = require('../models/data-collection-class.js');
const foodModel = require('../models/food.js');
const foodMngr = new DataMngr(foodModel);

router.get('/',getHandlerList);
router.get('/:id',getHandler);
router.post('/',postHandler);
router.put('/:id',putHandler);
router.delete('/:id',deleteHandler);

 async function getHandlerList(req,res,next){
     try {
        let resObj = await foodMngr.read();
        res.status(200).json(resObj);
     } catch (error) {
         next(error);         
     }
    

 }

 async function getHandler(req,res,next){
     try {
         let id =req.params.id;
         let resObj = await foodMngr.read(id);
         res.status(200).json(resObj);

         
     } catch (error) {
        next(error); 
       
     }
     
}

async function postHandler(req,res,next){

    try {
        let reqObj =req.body;
        let resObj = await foodMngr.create(reqObj);
        res.status(201).json(resObj);

        
    } catch (error) {
       next(error); 
      
    }
     
}

async function putHandler (req,res,next){
    try {
        let reqObj =req.body;
        let id =req.params.id;
        let resObj = await foodMngr.update(id,reqObj);
        res.status(200).json(resObj);

        
    } catch (error) {
       next(error); 
      
    }
     
}

async function deleteHandler (req,res,next){

    try {
        let id =req.params.id;
        let resObj = await foodMngr.delete(id)
        res.status(200).json(resObj);

        
    } catch (error) {
       next(error); 
      
    }
     
}

module.exports = router;
