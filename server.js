const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {getMenu, getBeans, postOrder, patchOrder, getOpenOrders} = require('./storage.js');

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => res.render('index'));
//menu route: get coffee menu
app.get('/API/menu', (req,res) => res.json(getMenu()));
//beans route: get beans list
app.get('/API/beans', (req,res) => res.json(getBeans()));
//order route: get open orders
app.get('/API/order', (req,res) => res.json(getOpenOrders()));
//order route: post new order
app.post('/API/order', (req,res) => res.json(postOrder(req.body)));
//order route: patch order status
app.patch('/API/order/:orderId', (req,res) => res.json(patchOrder(req.params.orderId, req.body)));

app.listen(8080, () => console.log('Listening on port 8080'));