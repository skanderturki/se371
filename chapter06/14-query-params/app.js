const express = require('express');
require('dotenv').config();

const app = express();

// Example:   http://localhost:3000/?id=78&name=skander
app.get('/', (request, response) => { 
  response.json({"id": request.query.id, "name": request.query.name});
} );

app.use( (request, response) => {
  response.status(404).send("<h1>404 Error</h1>");
});


app.listen(process.env.PORT, () => {
  console.log("Server running at http://localhost:" + process.env.PORT);
});
