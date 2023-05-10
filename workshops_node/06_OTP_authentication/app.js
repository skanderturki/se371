const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const appController = require("./controllers/appController");
const isAuth = require("./middleware/isAuth");

const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let sessionStore = new MongoDBStore({
	uri: process.env.MONGO_URI,
	collection: 'mySessions'
});

// Catch errors
sessionStore.on('error', function(error) {
  console.log(error);
});

// configure session middleware
app.use(session({
	secret: process.env.SESSION_SECRET,
	cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
	saveUninitialized: true,
	resave: true,
	store: sessionStore
}));

//=================== Routes
// Landing Page
app.get("/", appController.landing_page);

// Login Page
app.get("/login", appController.login_get);
app.post("/login", appController.login_post);

// Register Page
app.get("/register", appController.register_get);
app.post("/register", appController.register_post);

// OTP
app.post('/verifyotp', appController.verifyotp_post);
app.post('/resendotp', appController.resendotp_post);

// Dashboard Page
app.get("/dashboard", isAuth, appController.dashboard_get);

app.post("/logout", appController.logout_post);



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
