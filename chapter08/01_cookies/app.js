const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', (req, resp) => {
  const opts = {
    maxAge: 24 * 60 * 60 * 1000, // set age limit to 1 day
    httpOnly: true,
    secure: true
  }
  const entries = Object.entries(req.cookies);
  if (entries.length == 0) {
    console.log(`No cookies found...`);
    // now write new cookie as part of response
    resp.cookie('user', Math.random().toString(16).slice(2), opts);
  } else {
    for (const [name, value] of entries) {// loop through all cookies
      // resend same cookies found in request
      console.log(`${name}: ${value}`);
      resp.cookie(`${name}`, `${value}`, opts);
    }
  }
  resp.send('content sent to browser');
});

// start server
app.listen(3000, 'localhost', () => {
  console.log(`Listening on port 3000`);
});