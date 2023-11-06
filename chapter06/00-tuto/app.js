const express = require('express');


const app = express();

app.use( express.static('public') );   

app.use( (req, res, next) => {  
  console.log( `${req.method} ${req.path} - ${req.ip}` );  
  next();
});


app.get("/", (request, response) => {
  response.send("<h1>Hello!</h1>");
});

app.get("/about", (request, response) => {
  response.send("<h1>This is a website.....!</h1>");
});

app.use( (request, response) => {
  response.status(404).sendFile(__dirname + '/public/pages/404.html');
});
  

app.listen("3000", () => {
  console.log("Server listening on port 3000....");
});