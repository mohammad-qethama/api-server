'use strict';

const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema( {
  name:{type:String, required:true},
  type:{type:String}

} );

const foodModel = mongoose.model('Person',foodSchema);

module.exports = foodModel;


