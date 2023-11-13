const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get('/', (request, response) => {
  const books2 = [];
  const books = [{title: "Javascript", description: "An introduction to javaScript"}, 
                  {title: "Learn CSS", description: "The best CSS reference"}, 
                  {title: "UML", description: "A book about using UML to design web sites"}];
  response.render('homepage', {books: books2});
});

app.get('/about', (request, response) => {
  response.render('about');
});

app.get('/search', (request, response) => {
  response.render('search');
});


app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}.....`);
});