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


// turn the array of objects that comes out of the database into an object of objects with keys
const menuObject = (menuArray) => {
  const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {})
  return arrayToObject(menuArray, "id")
}

// Takes customerId and message content. Looks up customer phone number. Sends SMS through Twilio. 
const sendSMS = (customerId, content) => {
  const accountSid = process.env.twilio_accountSid;
  const authToken = process.env.twilio_authToken;
  const client = require('twilio')(accountSid, authToken);
  console.log('sendSMS')
    db.one('SELECT * FROM customer WHERE id = $1', [customerId])
      .then(function(data){
        client.messages
        .create({
          body: content,
          from: process.env.twilio_number,
          to: data.telephone
        })
        .then(message => console.log(message.sid))
        .done();
      })
  }

app.get('/', function(req, res){
  res.render('index');
});

app.get('/api/menu', function (req, res) {
  db.any('SELECT * FROM menu')
    .then(function(data){
    res.json(menuObject(data))
  })})

app.get('/api/order/:id/', function (req, res) {
  const transactionId = req.params.id;
  db.any('SELECT * FROM transaction_item WHERE transaction_id = $1', [transactionId])
    .then(function(data){
    res.json((data))
})})

app.get('/api/customer/:customerId/orders', function (req, res) {
  const customerId = req.params.customerId
  db.any('SELECT * FROM transaction WHERE customer_id = $1', [customerId])
    .then(function(data){
    res.json(data)
})})

app.get('/api/login/:customerEmail', function (req, res) {
  const customerEmail = req.params.customerEmail
  db.one('SELECT * FROM customer WHERE email = $1', [customerEmail])
    .then(function(data){
    res.json(data)
})})


app.post('/api/order', function (req, res) {
  const customerId = req.body.userId;
  const dateTime = new Date();
  const status = 'Testing';
  const transaction = Object.values(req.body.items)
  db.one('INSERT INTO transaction (customer_id, date_time, status) VALUES ($1,$2,$3) RETURNING id',[customerId, dateTime,status])
  .then(data => db.tx(t => {
    const queries = transaction.map(l => {
      return t.none('INSERT INTO transaction_item (transaction_id, menu_id, quantity) VALUES ($1, $2, $3)', [data.id, l.id, l.quantity])
    })
   return t.batch(queries).then(() => data)
  })
  .then(data => {
//Not waiting for result from Twilio promise because ..... I don't care.
    sendSMS(customerId, `Your pizza is being made! Get ready to get unhungry. Order #${data.id}`)
    res.json(Object.assign({dateTime: new Date()},data,))
  })
  .catch(error => {
    console.log('errordddd')
  }))
})
    
app.post('/api/customer', function (req, res) {
  const {email, name, companyName, streetAddress, town, postCode, telephone, deliveryInfo} = req.body
  db.one('INSERT INTO customer (email, name, company_name, street_address, town, post_code, telephone, delivery_info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', [email, name, companyName, streetAddress, town, postCode, telephone, deliveryInfo])
  .then(data => res.json(Object.assign({email: email},data)))
  .catch(error => {
    console.log(`${error} - could not add user`)
  })
})

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
