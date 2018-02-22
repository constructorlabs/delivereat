const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'hbs');
app.use('/static', express.static('static'));
app.use(bodyParser.json());

const storage = [];

app.get('/', function(req, res){
  res.render('index', {});
});

app.get('/admin', function(req, res){
  res.render('admin', {});
});

app.get('/api/menu', function(req, res){
  res.json({
    menu:[
      {
        key:'five',
        name: 'Five Points IPA',
        price: 5.00
      },
      {
        key:'beaver',
        name: 'Beavertown Smoked port',
        price: 5.50
      },
      {
        key:'hell',
        name: 'Camden Hells',
        price: 4.70
      },
      {
        key: 'dpony',
        name: 'Brewdog Dead Pony',
        price: 2.50
      },
      {
        key: 'oldrosy',
        name: 'Old Rosy',
        price: 3.50
      }
    ]
  });
});

app.post('/api/orders', function(req, res){
  storage.push(req.body);
  res.status(404).end();
  //.json(req.body);
});

app.listen(8080, function() { // Set app to listen for requests on port 3000
  console.log('Listening on port 8080!'); // Output message to indicate server is listening
});
