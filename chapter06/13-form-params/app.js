const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

// the public folder will be visible by http requests 
// like http://localhost:3000/css/styles.css if the css folder is in the public folder
app.use(express.static('public')); 
app.listen(3000, "localhost", () => { console.log("Listening on port 3000...") });
app.get('/', (request, response) => {
  response.sendFile('./pages/index.html', { root: __dirname });
});

app.get('/employees/city/:city', (request, response) => {
  response.end( `<p>Searching for employees from city: ${request.params.city}</p>` );
});

app.post('/name', (request, response) => {
  console.log(request.body);
  response.end( `<p>Selem ${request.body.first} ${request.body.last} </p>` );
});

// any other request will get this 404 response
app.use( (request, response) => {
  response.status(404).sendFile('./pages/404.html', { root: __dirname });
});
