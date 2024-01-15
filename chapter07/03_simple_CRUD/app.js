const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import articles routes
const articlesRoutes = require('./routes/articlesRoutes');

// Load configuration file .env
require('dotenv').config();

// Create an express app
const app = express();

// Add body parameters parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Configure the app to use EJS as view template engine
app.set('view engine', 'ejs');

// Use the 'public' folder as static
app.use(express.static('public'));

// Serve homepage
app.get('/', (request, response) => {
  response.render('index', { title: 'Home', articles: undefined});
});

// Add Articles Routes handler
app.use('/v1/articles', articlesRoutes);

// Serve 404 page if no corresponding route
app.use((request, response) => {
  response.status(400).render('404', { title: '404' });
});

// Connect to database then start server
mongoose.connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("Connected to database...");
    app.listen(process.env.port, 'localhost', () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });