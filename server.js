require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const app = express();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});


const {orderTotals} = require('./common/orderTotals.js')



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
    id: 7,
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

// const receiveOrder = (orderObject) => {
//   console.log(orderObject)
//   const totals = orderTotals(orderObject.items,menu)
//   if (Object.keys(orders).length === 0) {
//     orderId = 1
//   } else {
//     orderId = Math.max(...Object.keys(orders)) + 1
//   }
//   orders[parseInt(orderId)] = {
//     orderId : parseInt(orderId),
//     userId : orderObject.userId,
//     items: orderObject.items,
//     dateTime : new Date(),
//     itemsCost: totals.itemsCost,
//     deliveryCost: totals.deliveryCost,
//     discount: totals.discount,
//     totalCost: totals.itemsCost + totals.deliveryCost - totals.discount
//   }
//   return(orders[orderId])
// }


/// Need to turn orderObject.items into an array!!!

const receiveOrder = (orderObject) => {
  const customerId = 1;
  const dateTime = new Date();
  const status = 'Pending';
  const newTransaction = 0;
  db.one('INSERT INTO transaction (customer_id, date_time, status) VALUES ($1,$2,$3) RETURNING id',[customerId, dateTime,status])
    // .then(data => console.log(orderObject))
    .then(data => {
      Object.values(orderObject.items).forEach(item=> {
      console.log(item)
      db.one('INSERT INTO transaction_item (transaction_id, menu_id, quantity) VALUES ($1, $2, $3)', [data.id, item.id, item.quantity])
      })
    }
    )
    .catch(error => {
      res.json({
        error: error.message
      });
    });
}

// turn the array of objects that comes out of the database into an object of objects with keys
const menuObject = (menuArray) => {
  const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {})
  return arrayToObject(menuArray, "id")
}

app.get('/', function(req, res){
  res.render('index');
});

app.get('/api/menu', function (req, res) {
  console.log(orderTotals)
  db.any('SELECT * FROM menu')
    .then(function(data){
    res.json(menuObject(data))
  })})


app.post('/api/order', function (req, res) {
  const customerId = 1;
  const dateTime = new Date();
  const status = 'Testing';
  const newTransaction = 0
  const transaction = Object.values(req.body.items)
  console.log(req.body)
  db.one('INSERT INTO transaction (customer_id, date_time, status) VALUES ($1,$2,$3) RETURNING id',[customerId, dateTime,status])
  .then(data => db.tx(t => {
    const queries = transaction.map(l => {
      console.log(l.id)
      return t.none('INSERT INTO transaction_item (transaction_id, menu_id, quantity) VALUES ($1, $2, $3)', [data.id, l.id, l.quantity])
    })
    console.log(68787)
   return t.batch(queries).then(() => data)
  })
  .then(data => res.json(data))
  .catch(error => {
    console.log('errordddd')
  }))
})
    

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
