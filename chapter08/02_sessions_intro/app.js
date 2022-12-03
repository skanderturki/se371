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
  console.log(req.session);
	if (req.session.favorites) {
		const favorites = req.session.favorites;
		favorites.push( req.params.prodid );
	} else {
		req.session.favorites = [ req.params.prodid ];
	}
	// send message or do something else
  resp.send('content sent to browser');
});

app.listen(3000);