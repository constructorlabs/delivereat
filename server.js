const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {getMenu} = require('./storage')

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

//
app.get('/', function(req, res){
  res.render('index');
});

app.get('/api/menu', function(req, res){
  const menu = getMenu();
    res.json(menu);
  });

  app.post('/api/order', function(req, res){
    const order = order(req.body);
    createOrder(order);
    res.json(order)
    console.log(req.body)
    });

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
