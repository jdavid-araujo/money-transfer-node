const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const accountRoute = require('./route/accountRoute');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
      );
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });

app.use('/api/v1/accounts', accountRoute);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb://david-araujo:oieAf3bN2FZla0yj@money-transfer-node-ujhsl.mongodb.net/test?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));