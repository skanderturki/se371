const employees_router = require('./router/employees-routes.js');
const countries_router = require('./router/countries-routes.js');

const db = require("./config/database.js");

const express = require("express");

const app = express();
app.use(express.json()); 
//app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

// register routers
app.use("/api/v1/employees", employees_router);
app.use("/api/v1/countries", countries_router);

// Test server is working
app.get('/', (request, response) => {
  response.status(200).json({test:"ok"});
});


// Start server, then connect to database
app.listen(PORT, async () => {
  await db.connectToDB();
  console.log(`Server is listening at http://localhost:${PORT}`);
});




