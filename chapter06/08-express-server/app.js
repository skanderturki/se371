const express = require('express');

const app = express();

// the public folder will be visible by http requests 
// like http://localhost:3000/css/styles.css if the css folder is in the public folder
app.use(express.static('public')); 

app.listen(3000, "localhost", () => { console.log("Listening on port 3000...") });

app.get('/', (request, response) => {
  response.sendFile('./pages/index.html', { root: __dirname });  // the given path is relative to this root now
});

app.get('/about', (request, response) => {
  response.sendFile('./pages/about.html', { root: __dirname });
});

app.use( (request, response) => {
  response.status(404).sendFile('./pages/404.html', { root: __dirname });
});
