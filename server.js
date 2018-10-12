const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const {database} = require('./database.js');
const {getMenu, createNewOrder, listAllOrders} = database();



app.get('/', function(req, res){
  res.render('index');
});
app.get('/api/menu', (req, res) => {
  const menu=getMenu();
  res.json(menu)
})
app.post('/api/order',(req, res) => {
  const newOrder = createNewOrder(req.body)
  res.json(newOrder)
})
app.get('/api/order', (req, res) => {
  const placedOrders=listAllOrders()
  res.json(placedOrders)
})

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
