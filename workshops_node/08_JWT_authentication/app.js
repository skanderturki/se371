const express = require('express');

const books = require('./data/data.js');

const jwt = require("jsonwebtoken");

const mongoose = require('mongoose');

require('dotenv').config();

const appController = require("./controllers/appController");
const isAuth = require("./middleware/isAuth");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



//=================== Routes
// Landing Page
app.get("/", appController.landing_page);

// Login Page
app.get("/login", appController.login_get);
app.post("/login", appController.login_post);

// Register Page
app.get("/register", appController.register_get);
app.post("/register", appController.register_post);

// Dashboard Page
app.post("/dashboard", isAuth, appController.dashboard_post);
app.get("/dashboard/token/:token", isAuth, appController.dashboard_get);

app.post("/logout", appController.logout_post);



// Connect to database then start server
mongoose.connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("Connected to database...");
    app.listen(process.env.PORT, 'localhost', () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
