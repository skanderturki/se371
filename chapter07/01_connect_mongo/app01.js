const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
const Employee = require('./model/employee');

// Create some Employee objects from model
let emp1 = new Employee({name: 'Nafaa', age: 46, positions: ['ceo']});
let emp2 = new Employee({name: 'Salah', age: 30, positions: ['developer']});
let emp3 = new Employee({name: 'Mounir', age: 32, positions: ['accountant']});
let emp4 = new Employee({name: 'Ali', age: 28, positions: ['Developer']});
let emp5 = new Employee({name: 'Nawaf', age: 25, positions: ['project manager', 'developer']});

// Bulk insert all employees
const addAll = () => {
   const data = [emp1, emp2, emp3, emp4, emp5];
   Employee.collection.insertMany(data)
      .then( (docs) => {
         console.log("All employees inserted: " + docs.insertedCount);
      })
      .catch( (err) => {
         console.error(err);
      });
}

// // Connect to database
mongoose.connect(process.env.MONGO_URI)
   .then((result) => { 
      console.log('Connected to database...'); 
      
      addAll();

      // If you need to only insert one employee:
      // emp1.save()
      //    .then( (result) => {
      //        console.log("inserted: " + result);
      //    });
   })
   .catch((err) => {console.log(err); });

