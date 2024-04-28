const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
const Employee = require('./model/employee');

// Create some Employee objects from model
let emp1 = new Employee({name: 'Nafaa', age: 46, positions: ['ceo'], 
                     projects: [{name: 'WebStore', description: "A website for e-commerce"}, 
                     {name: 'Legacy IS evaluation', description: "Evaluate currently used IS"}
                  ]});
let emp2 = new Employee({name: 'Salah', age: 30, positions: ['developer'], projects: [{name: 'WebStore', description: "A website for e-commerce"}]});
let emp3 = new Employee({name: 'Mounir', age: 32, positions: ['accountant'], projects: [{name: 'Legacy IS evaluation', description: "Evaluate currently used IS"}]});
let emp4 = new Employee({name: 'Ali', age: 28, positions: ['Developer'], projects: [{name: 'WebStore', description: "A website for e-commerce"}]});
let emp5 = new Employee({name: 'Nawaf', age: 25, positions: ['project manager', 'developer'], projects: []});

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

   })
   .catch((err) => {console.log(err); });

