const { response } = require('express');
const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
const Employee = require('./schema/employee');

// Create an Employee object from model
let emp1 = new Employee({name: 'Salah', age: 34, positions: ['software developer', 'project manager']});
console.log(emp1);


// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then((result) => { console.log('Connected to database...'); })
  .catch((err) => {console.log(err); });

emp1.save()
  .then( (result) => { console.log('Data saved...' + result); });