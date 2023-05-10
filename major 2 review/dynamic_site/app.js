const express = require('express');
require('dotenv').config();

const {chairs} = require('./data/data.js');

const app = express();

// Folder containing static resources (css, img, etc...)
app.use(express.static('public'));

// Set up the template engine
app.set("view engine", "ejs");

// Homepage
app.get('/', (request, response) => {
  response.render('index', {chairs: chairs});
});

// about
app.get('/about', (request, response) => {
  response.render('about');
});

// Web API endpoint thbat serves chairs data as json
app.get('/v1/chairs', (request, response) => {
  response.json(chairs);
});

// Handle any unrecognized routes
app.use((request, response) => {
  response.status(404).render('404');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});