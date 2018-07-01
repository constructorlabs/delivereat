const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const menu = {
  1: {
    id: 1,
    name: 'Strawberry cheesecake',
    price: 6
  },

  2: {
    id: 2,
    name: 'deep fried rubberduck',
    price: 10
  },

  3: {
    id: 3,
    name: ' frozen timer',
    price: 20
  },

  4: {
    id: 4,
    name: ' pickled rubberduck',
    price: 30
  }
};

let id = 5;

const orders = {};

let orderid = 1;

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/menu', function(req, res) {
  res.json(menu);
  // console.log("fetched");
});

app.post('/api/order', function(req, res) {
  const index = orderid;
  orders[index] = req.body;
  orders[index]['id'] = index;
  orderid++;
  res.status(200).json({ OK: 'order completed' });
});

app.get('/api/order', function(req, res) {
  res.json(orders);
});

// app.post('/menu', function(req, res) {
//   const index = id;
//   menu[index] = req.body;
//   menu[index]['id'] = index;
//   id++;
//   res.status(200).json({ ok: 'menu added' });
// });

app.get('/orders', function(req, res) {
  res.json(orders);
});

app.listen(8080, function() {
  console.log('Listening on port 8080');
});
