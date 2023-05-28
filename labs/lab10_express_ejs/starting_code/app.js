const express = require('express');
require('dotenv').config();

// Import data object

// express app creation
const app = express();

// Add the public folder as a static files folder (so that files are accessible to client requests)
app.use(); 

// register view engine to express app
...

// Add routes handlers below
app.METHOD() ...


// Finally if no route corresponds to request render 404 page
app.use......


// listen for requests
app.listen(process.env.PORT, () => { 
  console.log(`Listening on port ${process.env.PORT}...`) 
});
