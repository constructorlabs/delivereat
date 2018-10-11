const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Loads bundle.js to load ReactJs components
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const menu = {
  1: {
    id: 1,
    name: 'Cheeseburger',
    price: 6,
    img: ''
  }
};

// create a new object / array to store orders

// handles first request from the user to localhost:8080 and call the index.hbs view to return an html page to the useri

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/api/menu', function(req, res) {
  res.json(menu);
});

// Server code is running in the server

app.listen(8080, function() {
  console.log('Listening on port 8080');
});
