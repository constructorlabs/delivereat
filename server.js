
// SERVER:  server.js is running on server with node
// BROWSER: react is running in the browser

// we start with node.js and run the server at port 8080
// type in URL
// server.js renders index.hbs file in 'views' folder, as defined in app.get()
// All files in express are stored in 'views' folder
// app.get is first the request - the route that deals with requests coming into the root path 
// html is loaded into the browser and parsed
// app.use() external dependancies in the 'static' folder are loaded into the browser (styles.css and bundle.js)
// we create an API from the menu object in server.js and use fetch to load the menu into the browser

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { menu } = require('./data/menu.js');
const { addToOrders, getOrders } = require('./data/orders.js');

// let orders = {};

// bodyParser converts json into correct format
app.use(bodyParser.json()); 

// this is middleware - define where to look for static files / dependancies
app.use('/static', express.static('static')); 

// server is using the handlebars (hbs) format to render html files
app.set('view engine', 'hbs');

// we are in the browser, at localhost:8080/
// when this first route is excecutes it renders index.hbs from 'views' folder
app.get('/', function(req, res){
  res.render('index');
});

app.get('/api/menu', function (req, res) {
  res.json(menu);
});

app.post('/api/order', function(req, res){
  addToOrders(req.body);
  res.status(200).json({message: "successful"});
  // res.status(404).json({error: 'Student not found'});
});

app.get('/api/order', function(req, res){
  const result = getOrders();
  res.json(result);
})

app.listen(8080, function(){
  console.log('Listening on port 8080');
});