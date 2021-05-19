'use strict';

require('dotenv').config(); //to use .env parameters
const mongoose = require('mongoose');
const server = require('./src/server.js');

mongoose.connect(process.env.MONGOOSE_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
    server.start(process.env.PORT);}
  ).catch((err)=>{
    console.log('Connection Failed ',err.message);

  });


// server.start(process.env.PORT);
