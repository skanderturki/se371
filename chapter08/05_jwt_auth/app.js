// Imports
const express = require('express');
const path = require('path');
const cors = require('cors');

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config({ path: './config/.env' });

const corsOptions = require('./config/corsOptions');

const app = express();
app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routers
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));


app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});


app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));