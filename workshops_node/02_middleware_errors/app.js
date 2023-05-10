const express = require('express');

const app = express();

function middleware1(req, res, next){
  console.log("This is middleware1 !!");

  next(new Error("Some Error"));
};

app.use(middleware1);

function finalware(req, res, next){
  console.log("This is the finalware !!");
  res.send('<h1>Hello World</h1>');
};

function errorHandler(err, req, res, next){
  res.json({err: err});
}

app.get('/', finalware);

app.use(errorHandler);

app.listen(3000);