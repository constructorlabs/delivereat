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

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');


app.get('/', function(req, res){
  res.render('index');
});


app.get('/api/menu', (req,res)=>{
  db.any(`select * from menu`)
  .then(data => res.json(data))
  .catch(error => res.json ({error: error.message}))
})

app.post('/api/order', (req,res)=>{
  db.one("INSERT INTO transaction (id, order_time) VALUES (DEFAULT, clock_timestamp()) RETURNING id")
  .then(result => {
      const orderId = result.id;
      const { finalOrder } = req.body;
      return Promise.all(finalOrder.map(item => {
        return db.none(
          "INSERT INTO basket (menu_id, transaction_id, quantity) VALUES ($1, $2, $3)",
          [item.menuItemId, orderId, item.quantity]
        );
      })).then(() => orderId);
    })
  .then(orderId => res.json({ orderId: orderId }))
  .catch(error => res.json({ error: error.message }));
})

app.listen(8080, function(){
  console.log('Listening on port 8080');
});


// const keys = Object.keys(orders);
// const newKey = Math.max([...keys]) + 1;
// console.log(newKey);
// orders[newKey] = req.body;
// res.json(newKey);