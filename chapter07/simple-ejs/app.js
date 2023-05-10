const { response } = require('express');
const express = require('express');
require('dotenv').config();

const books = require('./books.js');

// express app
const app = express();

// listen for requests
app.listen(process.env.PORT, "localhost", () => { console.log(`Listening on port ${process.env.PORT}...`) });

app.use(express.static('public')); 

// register view engine
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.render('index', {title: "Home", books: books});
})

app.get('/about', (request, response) => {
  response.render('about', {title: "About"});
})

app.use( (request, response) => {
  response.status(404).render('404', { title: "404", root: __dirname });
});
