const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const mongoose = require('mongoose');
const Employee = require('./model/employee');


// express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.send('<h1>OK</h1>');
});



// Find Projects By ID (you also need the id of the container employee)
// Example:  /v1/employee/6629f6d05af01453f00645dd/project/6629f6d05af01453f00645de
app.get('/v1/employee/:employee_id/project/:project_id', (request, response) => {
  Employee.findById(request.params.employee_id)
    .then( (result) => {
      response.send(result.projects.id(request.params.project_id));
    })
    .catch( (err) => {
      console.log(err) 
    });
});

 // Connect to database then start server
mongoose.connect(process.env.MONGO_URI)
.then((result) => { 
    console.log('Connected to database...');
    app.listen(process.env.PORT, "localhost", () => { 
      console.log(`Listening on port ${process.env.PORT}...`) 
    });
  })
.catch((err) => {console.log(err); });
