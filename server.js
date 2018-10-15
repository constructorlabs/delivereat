const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {getAllMenuItems, getMenuItemById} = require('./menu.js');
const {postOrder, patchOrder, getOpenOrders} = require('./orders.js');

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => res.render('index'));
//menu route: get all menu items
app.get('/menu', (req,res) => res.json(getAllMenuItems()));
//menu route: get individual menu item by id
app.get('/menu/:menuItemId', (req,res) => {
  const menuItem = getMenuItemById(req.params.menuItemId);
  if (menuItem) {
    res.json(menuItem);
  } else {
    res.status(404).json(`Error: Menu item with id ${req.params.menuItemId} does not exist!`);
  }
});
//order route: get open orders
app.get('/orders', (req,res) => res.json(getOpenOrders()));
//order route: post new order
app.post('/orders', (req,res) => res.json(postOrder(req.body)));
//order route: patch order status
app.patch('/orders/:orderId', (req,res) => res.json(patchOrder(req.params.orderId, req.body)));

app.listen(8080, () => console.log('Listening on port 8080'));