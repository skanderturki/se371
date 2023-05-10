const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

var load_data = process.argv[2];
const journalsRouter = require('./routers/journalsRouter');

const Journal = require('./models/Journal');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)
  .then( (result) => {
    console.log(`Connected to database...`);
    if(load_data != "0"){
      const records = require('./parsed.js');
      const exporter = require('./exporter');
      Journal.collection.drop()
      .then( async () => {
        await exporter.write("const data = [");
        records.forEach( async (journal) => {
          journal.save().then( () => {
            exporter.write(journal);
          })
        });
        await exporter.write("]; module.exports = data;");
      })
    console.log(`Data added to database...`);
    }
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}...`)
    });
  })
  .catch( (err) => { console.log(err); });



  // Handle cities routes
app.use('/journals', journalsRouter);

// Handle unknown routes
app.use( (request, response) => {
  response.status(404).send(`<h1>Error 404: Resource not found!</h1>`);
});