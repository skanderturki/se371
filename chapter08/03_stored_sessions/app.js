const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const app = express();

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