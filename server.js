const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const {getMenu, addOrder, getOrders} = require('./storage');

/// verbs ///

app.get('/', function(req, res){
  res.render('index');
});
app.get('/api/menu', function(req, res){
  const menu = getMenu();
  res.json(menu);
});

app.get("/api/orders", function(req, res) {
  const orders = getOrders();
  res.json(orders);
});

app.post('/api/orders', function(req, res){
  const order = req.body;
  res.json(addOrder(order));
});

// app.patch("/api/order/:orderid", function(req, res) {
// }

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
