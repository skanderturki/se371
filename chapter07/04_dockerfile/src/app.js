const express = require('express');

const app = express();

app.listen(process.env.SERVER_PORT, () => { 
  console.log(`Listening on port ${process.env.SERVER_PORT}...`) });

app.get('/', (request, response) => {
  response.send("Welcome to my app!"); 
});


app.use( (request, response) => {
  response.status(404).send("404 Not Found!");
});
