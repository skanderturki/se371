const express = require('express');
const session = require('express-session');
require('dotenv').config();

const db = require("./config/database");

const MySQLStore = require('express-mysql-session')(session);

const appController = require("./controllers/appController");
const authMiddleware = require("./middleware/auth");

const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let sessionStore = new MySQLStore({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB
});

// Catch errors
sessionStore.on('error', function(error) {
  console.log(error);
});

// configure session middleware
app.use(session({
  key: 'session_cookie_name',
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
  saveUninitialized: false,
  resave: false,
  store: sessionStore,
  createDatabaseTable: true
}));

//=================== Routes
// Landing Page
app.get("/", appController.landing_page);

// Login Page
app.get("/login", authMiddleware.isLogged, appController.login_get);
app.post("/login", appController.login_post);

// Register Page
app.get("/register", appController.register_get);
app.post("/register", appController.register_post);

// Dashboard Page
app.get("/dashboard", authMiddleware.isAuth, appController.dashboard_get);

app.post("/logout", appController.logout_post);



// Start server, then connect to database
app.listen(process.env.PORT, async () => {
  console.log(`Server is listening at http://localhost:${process.env.PORT}`);
  db.connectToDB()
    .then(result => {
      console.log(`Connection to database succeeded at ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}`);
    })
    .catch(err => {
      console.log(err);
    })
});