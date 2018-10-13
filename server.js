const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const menu = require('./menu.js');
const {getMenu, getMenuItem} =menu();

const order = require('./order.js');
const {createNewOrder, changeOrderItem, getOrder, deleteFoodItem, deleteOrder, orderList} = order();


app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');


// #1
app.get('/', (req, res) => {
  res.render('index');
});

// #2
app.get('/menu', (req, res) => {
  res.json(getMenu())
});

// #3
app.get('/menu/:id', (req, res) => {
  const result = getMenuItem(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send('The food item with the given ID was not found');
  }
});


// #4  Works
app.post('/orders', (req, res) => {
  res.json(createNewOrder(req.body));
});


// #5
app.get('/orders', (req, res) => {
  res.json(getOrder());
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
// // #6
// app.put('/orders/:id' , (req, res) => {
//   const result = changeOrderItem(req.params.id);
//   if (result) {
//     res.json(result)
//   }
//   else {
//      res.status(404).send('The food item with the given ID was not found');
//   }
// });



// #7
// app.delete('/orders/delete/:id', (req, res) => {
//   const result = (deleteFoodItem(req.params.id));
//   if (result) {
//     res.json(result)
//   }
//   else {
//     res.status(404).send('The food item with the given ID was not found');
//   }
// })


// #8
// app.delete('/orders/delete', (req, res) => {
//   const result = deleteOrder();
//   if (result) {
//     res.json(result)
//   }
//   else {
//     res.status(404).send('The order item was not found');
//   }
// })
//
//
