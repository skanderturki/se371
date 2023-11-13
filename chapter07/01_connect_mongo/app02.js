const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const mongoose = require('mongoose');
const Employee = require('./model/employee');

// express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to database then start server
mongoose.connect(process.env.MONGO_URI)
  .then((result) => { 
      console.log('Connected to database...');
      app.listen(process.env.PORT, "localhost", () => { 
        console.log(`Listening on port ${process.env.PORT}...`) 
      });
    })
  .catch((err) => {console.log(err); });



 app.post('/v1/employees/name/:name/age/:age/positions/:positions', (request, response) => {
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

 app.post('/v1/employees/age/:age/positions/:positions', (request, response) => {

  let age = request.params.age;
  let positions = request.params.positions.split(";");

  let emp = new Employee({name:  null, age: age, positions: positions});
  emp.save()
      .then( (result) => { 
          console.log('Data saved...'); 
          // Just to see in the browser that save worked correctly
          response.send(result);
      })
      .catch( (err) => console.log(err));
 });

 app.post('/v1/employees/', (request, response) => {
  let name = request.body.name;
  let age = request.body.age;
  let positions = request.body.positions;

  let emp = new Employee({name: name, age: age, positions: positions});
  emp.save()
      .then( (result) => { 
          console.log('Data saved...'); 
          // Just to see in the browser that save worked correctly
          response.send(result);
      })
      .catch( (err) => console.log(err));
 });

 app.get('/v1/employees', (request, response) => {
  Employee.find()
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err) 
    });
 });

 app.get('/v1/employees/id/:id', (request, response) => {
  Employee.findById(request.params.id)
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err);
    });
 });

 app.get('/v1/employees/positions/:position', (request, response) => {
  Employee.find({ positions: request.params.position })
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err);
    });
 });

 app.get('/v2/employees/positions/:position', (request, response) => {
  Employee.find({ positions: request.params.position })
  .sort({ age : 1 })
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err);
    });
 });

 app.get('/v3/employees/positions/:position', (request, response) => {
  Employee.find({ positions: request.params.position })
    .sort( { age: 1 } )
    .select( 'name positions' )
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err);
    });
 });