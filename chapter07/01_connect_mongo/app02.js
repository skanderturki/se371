const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
const Employee = require('./schema/employee');

// express app
const app = express();

// Connect to database then start server
mongoose.connect(process.env.MONGO_URI)
  .then((result) => { 
      console.log('Connected to database...');
      app.listen(process.env.PORT, "localhost", () => { 
        console.log(`Listening on port ${process.env.PORT}...`) 
      });
    })
  .catch((err) => {console.log(err); });



 app.get('/add-employee/name/:name/age/:age/positions/:positions', (request, response) => {
  let name = request.params.name;
  let age = request.params.age;
  let positions = request.params.positions.split(";");

  let emp = new Employee({name: name, age: age, positions: positions});
  emp.save()
      .then( (result) => { 
          console.log('Data saved...'); 
          // Just to see in the browser that save worked correctly
          response.send(result);
      })
      .catch( (err) => console.log(err));
 });

 app.get('/all-employees', (request, response) => {
  Employee.find()
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err) 
    });
 });

 app.get('/find-employee/id/:id', (request, response) => {
  Employee.findById(request.params.id)
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err);
    });
 });

 app.get('/find-employee/position/:position', (request, response) => {
  Employee.find({ positions: request.params.position })
  .sort({ age : -1})
  .select('name positions')
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err);
    });
 });

 app.get('/find-employee2/position/:position', (request, response) => {
  Employee.find({ positions: request.params.position })
    .sort( { age: -1 } )
    .select( 'name positions' )
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err);
    });
 });