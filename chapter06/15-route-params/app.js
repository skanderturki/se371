const express = require('express');
require('dotenv').config();

const app = express();

// Example:    http://localhost:3000/employee/34/skander
app.get('/employee/:id/:name', (request, response) => { 
  response.json({"id": request.params.id, "name": request.params.name});
} );

app.use( (request, response) => {
  response.status(404).send("<h1>404 Error</h1>");
});


app.listen(process.env.PORT, () => {
	console.log("Server running at port: " + process.env.PORT);
});