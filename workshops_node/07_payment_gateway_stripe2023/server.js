const express = require('express');
const fs = require('fs');

require('dotenv').config();

// Import and configure stripe with secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeConstructor = require('stripe');
const stripe = stripeConstructor(stripeSecretKey);

// Create an express server
const app = express();

// Set the 'public' folder to be used for static files
app.use(express.static("public"));

// Add middelware that parse json data
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
            books: data.books
          });
    }
  });
});

app.post('/create-checkout-session', (req, res)=>{
  try {
    fs.readFile('./data/data.json', async (error, result) => {
      if(error) {
        res.status(500).json({error: error});
      } else {
        const itemsJSON = JSON.parse(result);
        const items = itemsJSON.books;
  
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment', //one time payment, other modes include 'subscription'
          line_items: req.body.items.map( item => {
            const itemJSON = items.find((i) => {
              return i.id == item.id;
            })
            return {
              price_data: {
                currency: 'AED',
                product_data: {
                  name: itemJSON.name,
                  description: `Product id: ${itemJSON.id}`
                },
                unit_amount: itemJSON.price
              },
              quantity: item.quantity,
            }
          }),
          success_url: `${process.env.SERVER_URL}/success`,
          cancel_url: `${process.env.SERVER_URL}/`,

        });
        res.json({ url: session.url });
      }
    });
  } catch (e) {
    res.status(500).json({error: e.message});
  }
  
});

app.get('/success', (req, res)=>{
  res.render('success');
});

app.get('/about', (req, res)=>{
  res.render('about');
});

// Hanlde unknown routes
app.use((req, res) => {
  res.status(404).render('404');
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}...`);
});