const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

webpush.setVapidDetails('mailto:skanderturki@gmail.com', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

// Import data object
const chairs = require('./data.js');

// express app creation
const app = express();

// Add the public folder as a static files folder (so that files are accessible to client requests)
app.use(express.static('public')); 

app.use(bodyParser.json());

// register view engine to express app
app.set('view engine', 'ejs');

//// PUSH ROUTES
app.post('/subscribe/date', (request, repsonse) => {
  const subscription = request.body;

  response.status(201).json({});

  const payload = JSON.stringify({ title: "Subscription to date updates" , date: new Date()});

  webpush.sendNotification(subscription, payload)
    .catch(error => {
      console.log(error);
    });
});

// Add routes handlers below
app.get('/', (request, response) => {
  response.render('index', { chairs: chairs});
})

app.get('/about', (request, response) => {
  response.render('about');
})

// Finally if no route corresponds to request render 404 page
app.use( (request, response) => {
  response.render('404');
});


// listen for requests
app.listen(process.env.PORT, () => { 
  console.log(`Listening on port ${process.env.PORT}...`) 
});
