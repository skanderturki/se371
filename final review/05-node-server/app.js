const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

const itemsController = require('./controllers/itemsController');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', itemsController.getItems);
app.post('/items/addItem', itemsController.addItem);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
  .then( (result) => {
    console.log("Connected to database...");
    app.listen(process.env.PORT, () => {
      console.log(`Server listening at port ${process.env.PORT}`);
    });
  })
  .catch( (err) => {
    console.log(err);
  });

