'use strict';
const mongoose = require('mongoose');

const clotheSchema = mongoose.Schema({
  size:{type:String , required: true },
  color:{type:String}
});

const clothesModel = mongoose.model('Clothes',clotheSchema);

module.exports= clothesModel;

