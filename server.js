const express = require('express');
const bodyParser = require('body-parser');
const {orderTotals} = require('./common/orderTotals.js')

const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

let orders = {}
let orderId = 0

const menu = {
  1: {
    id: 1,
    name: "Marinara",
    ingredients: "Tomato sauce, garlic, basil, oregano, olive oil (v)",
    price: 8
  },
  2: {
    id: 2,
    name: "Margherita",
    ingredients: "Tomato sauce, fior di latte, basil, olive oil (v)",
    price: 9
  },
  3: {
    id: 3,
    name: "Funghi",
    ingredients: "White sauce, mushrooms, parmesan, aged mozzarella, roasted garlic, arugula (v)",
    price: 12
  },
  4: {
    id: 4,
    name: "Carciofi",
    ingredients: "Tomato sauce, artichokes, pancetta, cherry tomatoes, parmesan, aged mozzarella, basil ",
    price: 14
  },
  5: {
    id: 5,
    name: "Calabrese",
    ingredients: "Tomato sauce, soppressata, fior di latte, nicoise olives, oregano",
    price: 14
  },
  6: {
    id: 6,
    name: "Finnochionna",
    ingredients: "Tomato sauce, fennel sausage, provolone, parmesan, spicy peppers",
    price: 15
  },
  7: {
    id: 6,
    name: "Pistaccio",
    ingredients: "White sauce, mortadella, fior di latte, parmesan, basil pistachio pesto",
    price: 13
  }
};

const users = {
  1: {
    id:1,
    email: 'phil@berryman.org.uk',
    address: 'Flat 1, 12 Smyrna Road, London, NW6 4LY',
    phone: '07726 002626'
  }
}

const receiveOrder = (orderObject) => {
  console.log(menu)
  const totals = orderTotals(orderObject.items,menu)
  if (Object.keys(orders).length === 0) {
    orderId = 1
  } else {
    orderId = Math.max(...Object.keys(orders)) + 1
  }
  orders[parseInt(orderId)] = {
    orderId : parseInt(orderId),
    userId : orderObject.userId,
    items: orderObject.items,
    dateTime : new Date(),
    itemsCost: totals.itemsCost,
    deliveryCost: totals.deliveryCost,
    discount: totals.discount,
    totalCost: totals.itemsCost + totals.deliveryCost - totals.discount
  }
  console.log(orders)
  return(orders[orderId])
}



app.get('/', function(req, res){
  res.render('index');
});

app.get('/api/menu', function (req, res) {
  console.log(orderTotals)
  res.json(menu);
});

app.post('/api/order', function (req, res) {
  res.json(receiveOrder(req.body))
});

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
