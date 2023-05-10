const express = require('express');

const app = express();

function middleware1(req, res, next){
  console.log("This is middleware1 !!");
  next();
};

function finalware(req, res, next){
  console.log("This is the finalware !!");
  res.send('<h1>Hello World</h1>');
};

app.get('/', middleware1, finalware);

app.listen(3000);