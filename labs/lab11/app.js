const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// import model
const Company = require('./model/company');

const company1 = new Company({code: "CMP1", name: "EKSTRA", 
                  address: "King Fahd road, Riyadh",
                  description: "Company that sells electronics", 
                  capital: 200000, 
                  owner: "Salah"});

console.log(company1);

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
