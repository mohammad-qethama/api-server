'use strict';
// 3rd party dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// route handling module

const foodRoute = require('./routes/food.js');
const clothesRoute = require('./routes/clothes.js');

// error handling module 
const error404 = require('./error-handlers/404.js');
const error500 = require('./error-handlers/500.js');





app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/food',foodRoute);
app.use('/clothes',clothesRoute);

app.use('*', error404);
app.use(error500);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
