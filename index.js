const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

const menu = {
  1: {
    id: 1,
    name: 'Strawberry cheesecake',
    price: 6,
    img:
      'https://realfood.tesco.com/media/images/Strawberry-cheesecake-HERO-5a1d2423-4523-4f1e-9917-7bdf16c5008b-0-472x310.jpg'
  },

  2: {
    id: 2,
    name: 'Blueberry cheesecake',
    price: 10,
    img:
      'https://realfood.tesco.com/media/images/Strawberry-cheesecake-HERO-5a1d2423-4523-4f1e-9917-7bdf16c5008b-0-472x310.jpg'
  },

  3: {
    id: 3,
    name: 'Vanilla cheesecake',
    price: 20,
    img:
      'https://realfood.tesco.com/media/images/Strawberry-cheesecake-HERO-5a1d2423-4523-4f1e-9917-7bdf16c5008b-0-472x310.jpg'
  },

  4: {
    id: 4,
    name: 'New York cheesecake',
    price: 30,
    img:
      'https://realfood.tesco.com/media/images/Strawberry-cheesecake-HERO-5a1d2423-4523-4f1e-9917-7bdf16c5008b-0-472x310.jpg'
  }
};

let id = 5;

let orderTime = new Date();

const orders = {};

let orderid = 1;

// app.get('/', function(req, res) {
//   res.render(__dirname + '/views/index.hbs');
// });

app.get('/menu', function(req, res) {
  res.json(menu);
  // console.log("fetched");
});

app.post('/api/order', function(req, res) {
  const index = orderid;
  orders[index] = req.body;
  orders[index]['id'] = index;
  orderid++;
  orders[index]['orderTime'] = orderTime.toISOString();
  res.render('Successorder');
});

app.get('/orders', function(req, res) {
  res.json(orders);
});

app.post('/menu', function(req, res) {
  const index = id;
  menu[index] = req.body;
  menu[index]['id'] = index;
  id++;
  res.status(200).json({ ok: 'menu added' });
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`Listening on port number ${port}`);
});
