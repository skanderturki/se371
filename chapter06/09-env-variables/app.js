const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static('public')); 

app.listen(process.env.PORT, "localhost", () => { console.log(`Listening on port ${process.env.PORT}...`) });

app.get('/', (request, response) => {
  response.sendFile('./pages/index.html', { root: __dirname });
});

app.get('/about', (request, response) => {
  response.sendFile('./pages/about.html', { root: __dirname });
});

app.use( (request, response) => {
  response.status(404).sendFile('./pages/404.html', { root: __dirname });
});
