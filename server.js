const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {getMenu, getItem, postOrder, getOrders } = require('./storage')

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');


app.get('/', function(req, res){
  res.render('index');
});

app.get('/menu', function(req, res){
  menu = getMenu();
  res.json(menu)
});

app.get('/menu/:itemId', function(req, res){
  const menuItem = getItem(req.params.itemId)
  if(req.params.itemId){
    res.json(menuItem)
  } else {
    res.status(404).json({error: 'Lost in the fridge'});
  }
})

app.post('/order', function(req, res){
  const newOrder = req.body;
  res.json(postOrder(newOrder))
})

app.get('/order', function(req, res){
  orders = getOrders()
  res.json(orders)
})

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
