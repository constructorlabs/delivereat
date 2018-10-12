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
    name: 'bacon roll',
    price: 4
  },
  2: {
    id: 2,
    name: 'bacon & egg roll',
    price: 5
  },
  3: {
    id: 3,
    name: 'sausage sandwich',
    price: 4
  },
  4: {
    id: 4,
    name: 'scrambled eggs',
    price: 4
  },
  5: {
    id: 5,
    name: 'toast & jam',
    price: 3
  },
  6: {
    id: 6,
    name: 'toast (2 slices)',
    price: 2
  },
  7: {
    id: 7,
    name: 'avocado & toast',
    price: 5
  }
};

// create a new object / array to store orders

// handles first request from the user to localhost:8080 and call the index.hbs view to return an html page to the useri

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/api/menu', function(req, res) {
  res.json(menu);
})

// Server code is running in the server

app.listen(8080, function() {
  console.log('Listening on port 8080');
});
