'use strict';

const express = require('express');
const router = express.Router();

const DataMngr = require('../models/data-collection-class.js');
const clothesModel = require ('../models/clothes.js');

const clothesMngr = new DataMngr(clothesModel);

router.get('/',getHandlerList);
router.get('/:id',getHandler);
router.post('/',postHandler);
router.put('/:id',putHandler);
router.delete('/:id',deleteHandler);


async function getHandlerList(req,res,next){
    try {
        let resObj = await clothesMngr.read();
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
        
    }
}




async function getHandler(req,res,next){
    try {
        let id =req.params.id;
        let resObj = await clothesMngr.read(id);
        res.status(200).json(resObj);

        
    } catch (error) {
       next(error); 
      
    }
    
}

async function postHandler(req,res,next){

   try {
       let reqObj =req.body;
       let resObj = await clothesMngr.create(reqObj);
       res.status(201).json(resObj);

       
   } catch (error) {
      next(error); 
     
   }
    
}

async function putHandler (req,res,next){
   try {
       let reqObj =req.body;
       let id =req.params.id;
       let resObj = await clothesMngr.update(id,reqObj);
       res.status(200).json(resObj);

       
   } catch (error) {
      next(error); 
     
   }
    
}

async function deleteHandler (req,res,next){

   try {
       let id =req.params.id;
       let resObj = await clothesMngr.delete(id)
       res.status(200).json(resObj);

       
   } catch (error) {
      next(error); 
     
   }
    
}

module.exports = router;
