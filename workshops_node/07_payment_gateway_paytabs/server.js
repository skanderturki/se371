const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

require('dotenv').config();

const paytabsServerKey = process.env.PAYTABS_SERVER_KEY;
//const APP_DOMAIN = `http://localhost:${process.env.PORT}`;

const stripe = require('stripe')(stripeSecretKey);

// Create an express server
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Configure EJS as our view templates engine
app.set("view engine", "ejs");

app.get('/', (req, res)=>{
  fs.readFile('./data/data.json', (error, result) => {
    if(error) {
      res.status(500).end();
    } else {
      const data = JSON.parse(result);
      res.render('index', 
          {
            books: data.books,
            paytabsServerKey: paytabsServerKey
          });
    }
  });
});


app.get('/about', (req, res)=>{
  res.render('about');
});

app.get('/success', (req, res)=>{
  res.render('success');
});


app.post('/purchase', (req, res)=>{
  fs.readFile('./data/data.json', (error, result) => {
    if(error) {
      res.status(500).end();
    } else {
      const itemsJSON = JSON.parse(result);
      const items = itemsJSON.books;
      let total = 0;
      req.body.items.forEach((item) => {
        const itemJSON = items.find((i) => {
          return i.id == item.id;
        })
        total += itemJSON.price * item.quantity;
      });

      stripe.charges.create({
        amount: total,
        source: req.body.stripeTokenId,
        currency: 'usd',
      }).then( () => {
        console.log("Charge successfull");
        res.json({message: 'Purchase successful'})
      }).catch(() => {
        console.log("Charge failed");
        res.status(500).end();
      })
    }
  });
});

// Set the 'public' folder to be used for static files
app.use(express.static("public"));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}...`);
});