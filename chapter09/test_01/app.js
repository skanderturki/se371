const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

// Middleware used to parse data from form payload (non-JSON)
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'));

app.set('view engine', 'ejs');

// main route: redirect to search page
app.get('/', (request, response) => {
  response.redirect('/homepage');
})

// display search sales page
app.get('/homepage', (request, response) => {
  response.render('homepage', {data: [], message: ""});
})

// register Push API endpoint
app.get('/server-sent-events', function(req, res) {

  res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
  });

  var interval = setInterval(function(){
      data = "Real-Time Update "+number;
      console.log("SENT: "+data);
      res.write("data: " + data + "\n\n")
      number++;
  }, randomInteger(2,9)*1000);

  // close
  res.on('close', () => {
      clearInterval(interval);
      res.end();
  });
})

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}  


// For all unknown routes/resources
app.use((request, response) => {
  response.render('404');
});

// Connect to database and start express server
mongoose.connect(process.env.MONGO_SERVER)
  .then(() => {
    console.log(`Connected to database server...`);
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port: ${process.env.PORT}`);
    })
  })
  .catch((err) => {
    console.log(`An error occured when starting the app:\n ${err}`);
  });



var data = "Real-Time Update 1";
var number = 1;

