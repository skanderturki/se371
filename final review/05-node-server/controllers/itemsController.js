const Item = require('../models/Item');

var ERROR = "";

const getItems = (request, response) => {
  Item.find()
    .then( (result) => {
      response.render('index', {title: "Homepage", items: result, error: ERROR});
      ERROR = "";
    })
    .catch( (err) => {
      ERROR = "Data Couldn't be loaded!";
      response.render('index', {title: "Homepage", items: [], error: ERROR});
    });
}

const addItem = (request, response) => {
  // get the data from the POST request
  let name = request.body.name;
  let description = request.body.description;
  let filename = request.body.filename;
  // Create an object with that data
  let newItem = new Item({name: name, description: description, filename: filename});

  // Save the object to the database
  newItem.save()
    .then( (result) => {
      ERROR = "";
      response.redirect('/');
    })
    .catch( (err) => {
      ERROR = "Data Couldn't be Added!";
      response.redirect('/');
    });
}

module.exports = {getItems, addItem};