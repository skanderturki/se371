const express = require('express');
require('dotenv').config();

// Import data object
const data = require("./data");

// express app creation
const app = express();

// Add the public folder as a static files folder (so that files are accessible to client requests)
app.use(express.static('public')); 

// register view engine to express app
app.set("view engine", "ejs");

// Add routes handlers below
app.get("/", (request, response) => {
  response.render("index", {chairs: data});
});

app.get("/about", (request, response) => {
  response.render("about");
});


// Finally if no route corresponds to request render 404 page
app.use((request, response) => {
  response.status(404).render("404");
});


// listen for requests
app.listen(process.env.PORT, () => { 
  console.log(`Listening on port ${process.env.PORT}...`) 
});
