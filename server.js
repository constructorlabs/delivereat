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
  .then(orderId => {

    sendSMS(req.body.customer.mobile, orderId);
    
    res.json({ orderId: orderId })})
  .catch(error => res.json({ error: error.message }));
})

function sendSMS(mobile, orderId){
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_FROM_NUMBER;
    const client = require("twilio")(accountSid, authToken);
    const number = mobile;
    client.messages
      .create({
        body: `Thanks for your order no: ${orderId}. Our chefs have started cooking up your meal and it will be with you within 30 min.`,
        from: fromNumber,
        to: number
      })
      .then(message => console.log(message.sid))
      .done();
    // not waiting for response from Twilio as it is irrelevant
}

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
