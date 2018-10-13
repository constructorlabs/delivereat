const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const{
 menu, orders
} = require('./apiFunctions.js')

const {getAllItems, getItem} = menu() 
const {getAllOrders,getOrder,createNewOrder} = orders()

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');



app.get('/', function(req, res){
  res.render('index');
});

//Menu Routes
app.get('/menu', function(req, res){
  
  const allItems = getAllItems()
  res.json(allItems)
});

app.get('/menu/:itemId', function(req, res){
  const item = getItem(req.params.itemId)
  if(item){
    return res.json(item)
  } else res.status(404).json({error: 'this item does not exist'})
});







//Order Routes
app.get('/order', function(req,res){
  const allOrders = getAllOrders()
  res.json(allOrders)
})

app.get('/order:orderId', function(req,res){
  const specificOrder = getOrder()
  res.json(specificOrder)
})

app.post('/order', function(req,res){
    const newOrder = req.body;
    res.status(201).json(createNewOrder(newOrder))
})




//Listen Route
app.listen(8080, function(){
  console.log('Listening on port 8080');
});
