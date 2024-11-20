const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const app = express();

let sessionStore = new MySQLStore({
	host: process.env.MYSQL_SESSIONS_HOST,
	port: process.env.MYSQL_SESSIONS_PORT,
	user: process.env.MYSQL_SESSIONS_USER,
	password: process.env.MYSQL_SESSIONS_PWD,
	database: process.env.MYSQL_SESSIONS_DB
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

app.get('/addToFavorites/:prodid', function(req, resp) {

	req.session.isAuth = true;
	if (req.session.favorites) {
		const favorites = req.session.favorites;
		favorites.push( req.params.prodid );
	} else {
		req.session.favorites = [ req.params.prodid ];
	}
	console.log(req.session);
	// send message or do something else
	req.session.save(
		() => {resp.send('content sent to browser');}
	);
  
});


app.listen(process.env.port, 'localhost', () => {
		console.log(`Listening on port ${process.env.PORT}`);
});
