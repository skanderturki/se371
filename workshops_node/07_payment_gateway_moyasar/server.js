const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

require('dotenv').config();

const moyasarSecretKey = process.env.MOYASAR_SECRET_KEY;
const moyasarPublicKey = process.env.MOYASAR_PUBLIC_KEY;

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

        let total = 0;
        let description = `Purchased: \n`;
        req.body.items.forEach((item) => {
          const itemJSON = items.find((i) => {
            return i.id == item.id;
          })
          description += `${itemJSON.id}:  ${item.quantity} at ${itemJSON.price} ;\n`;
          total += itemJSON.price * item.quantity;
        });
        // const session = await stripe.checkout.sessions.create({
        //   payment_method_types: ['card'],
        //   mode: 'payment', //one time payment, other modes include 'subscription'
        //   line_items: req.body.items.map( item => {
        //     const itemJSON = items.find((i) => {
        //       return i.id == item.id;
        //     })
        //     return {
        //       price_data: {
        //         currency: 'AED',
        //         product_data: {
        //           name: itemJSON.name,
        //           description: `Product id: ${itemJSON.id}`
        //         },
        //         unit_amount: itemJSON.price
        //       },
        //       quantity: item.quantity,
        //     }
        //   }),
        //   success_url: `${process.env.SERVER_URL}/success.html`,
        //   cancel_url: `${process.env.SERVER_URL}/cancel.html`,

        // });
        res.render('moyasar_form', {
                                    items: items, 
                                    moyasarPublicKey: moyasarPublicKey,
                                    total: total,
                                    description: description
                                  });
      }
    });
  } catch (e) {
    res.status(500).json({error: e.message});
  }
  
});

app.get('/about', (req, res)=>{
  res.render('about');
});

app.get('/success', (req, res)=>{
  res.render('success');
});

app.get('/cancel', (req, res)=>{
  res.render('cancel');
});


// Set the 'public' folder to be used for static files
app.use(express.static("public"));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}...`);
});