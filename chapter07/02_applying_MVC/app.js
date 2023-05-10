const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');

// Import employee routes
const employeeRouter = require('./routes/employeeRoutes');

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

// Employee Routes
app.use('/v1/employees', employeeRouter);

// Handle wrong requests
app.use((request, response) => {
  response.status(404).send('<h1>Error 404: Resource not found.</h1>');
})