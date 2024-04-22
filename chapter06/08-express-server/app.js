const express = require('express');

const app = express();

// the public folder will be visible by http requests 
// like http://localhost:3000/css/styles.css if the css folder is in the public folder
app.use(express.static('public')); 

// A middleware that saves the time of reception of the request in the req object
app.use((req, res, next) => {
  req.time = new Date().toString();
  next();
});

// A middleware that logs information about received requests
app.use((req, res, next) => {  
  console.log( `${req.method} ${req.path} - ${req.time}` );  
  next();
});

app.get('/', (request, response) => {
  response.sendFile('./pages/index.html', { root: __dirname });  // the given path is relative to this root now
});

app.get('/about', (request, response) => {
  response.sendFile('./pages/about.html', { root: __dirname });
});

app.use( (request, response) => {
  console.log("404 code executed");  // Just to see if this middleware is executed
  response.status(404).sendFile('./pages/404.html', { root: __dirname });
});

app.listen(3000, () => { console.log("Listening on port 3000...") });