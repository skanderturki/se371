const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
// configure views folder
//app.set('views', 'otherThanViewsFolder');

app.use(express.static('public')); 

app.get('/', (req, res) => {
  const blogs = [];
  const blogs2 = [
    {title: 'The best restaurant in town', snippet: 'La Tagliata in Positano:  Probably the best lunch to be found in all of Italy.  Mama is in the kitchen cooking farm to table specialties, served family style...'},
    {title: 'Avli Restaurant: Rethymnon Old City, Greece', snippet: 'When seeking the finest gourmet restaurants in Europe, don’t overlook Avli Restaurant. The award-winning restaurant is one of the Founding Members...'},
    {title: 'Villa Le Barone Restaurant: Chianti, Italy', snippet: 'When thinking of gourmet restaurants in Europe, Italy often springs to mind. Famous for its food culture, this continental country is to thank for ma...'},
  ];
  res.render('index', { title: 'Home', blogs: blogs, showTitle: false }); // second argument is data sent to template
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', showTitle: true });
});

app.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new blog', showTitle: false });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

// listen for requests
app.listen(3000, () => {
  console.log(`Server listening on http://localhost:3000`);
});