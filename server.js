const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const menu = {
  1: {
    id: 1,
    name: "chilli squid",
    img: '/static/images/squid.png',
    price: 6.75
  },
  2: {
    id: 2,
    name: "pulled pork gyoza",
    img: '/static/images/gyoza.png',
    price: 5.95
  },
  3:{
    id: 3,
    name: "bbq beef steamed hirata",
    img: '/static/images/hirata.png',
    price: 5.55
  },
  4:{
    id:4,
    name: "chicken ramen",
    img: '/static/images/ramen.png',
    price: 9.95
  },
  5:{
    id:5,
    name: "yaki udon",
    img: '/static/images/udon.png',
    price: 9.95
  },
  6:{
    id:6,
    name: "chicken katsu curry",
    img: '/static/images/curry.png',
    price: 10.75
  }
};

const orders = {

}

app.get('/', function(req, res){
  res.render('index');
});

app.get('/api/menu', (req,res)=>{
  res.json(Object.values(menu));
})

app.post('/api/order', (req,res)=>{
  const keys = Object.keys(orders);
  const newKey = Math.max([...keys]) + 1;
  console.log(newKey);
  orders[newKey] = req.body;
  res.json(newKey);
})

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
