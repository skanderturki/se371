const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile('./pages/index.html', { root: __dirname });
});

app.get('/about', (request, response) => {
  response.sendFile('./pages/about.html', { root: __dirname });
});

app.get('/echo/:word', (req, res) => {
  let param = req.params.word;
  res.json({ echo: param });  //use the variable as needed
});


app.use((request, response) => {
  response.status(404).sendFile('./pages/404.html', { root: __dirname });
});

app.listen(process.env.PORT, "localhost", () => { 
  console.log(`Listening on port ${process.env.PORT}...`);
});
