const Item = require('../models/Item');


const getItems = (request, response) => {
  Item.find()
    .then( (result) => {
      response.render('index', {title: "Homepage", items: result, error: null});
    })
    .catch( (err) => {
      response.render('index', {title: "Homepage", items: [], error: "Data Couldn't be loaded!"});
    });
}

const addItem = (request, response) => {
  // get the data from the POST request
  // const name = request.body.name;
  // const description = request.body.description;
  // const filename = request.body.filename;
  const { name, description, filename } = request.body;
  
  // Create an object with that data
  let newItem = new Item({name: name, description: description, filename: filename});

  // Save the object to the database
  newItem.save()
    .then( (result) => {
      response.redirect('/');
    })
    .catch( (err) => {
      response.render('index', {title: "Homepage", items: [], error: "Couldn't save Item to database"});
    });
}

module.exports = {getItems, addItem};