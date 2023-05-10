const express = require('express');
const session = require('express-session');
require('dotenv').config();

const app = express();

// configure session middleware
app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: false,
	resave: false
}));

app.get('/addToFavorites/:prodid', function(req, resp) {

	if (req.session.favorites) {
		const favorites = req.session.favorites;
		favorites.push( req.params.prodid );
	} else {
		req.session.favorites = [ req.params.prodid ];
	}
	console.log(req.session);
	// send message or do something else
  resp.send('content sent to browser');
});

// start server
app.listen(5000, 'localhost', () => {
  console.log(`Listening on port 5000`);
});