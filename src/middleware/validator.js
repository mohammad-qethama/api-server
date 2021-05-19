'use strict';
module.exports=(req,res,next)=>{
  console.log(req.query.name);
  if (req.query.name){
    res.status(200).json({
      name:req.query.name
    });
  }else{
    next('There is no name');

  }
};
