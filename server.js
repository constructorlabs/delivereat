const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('index', {});
});

app.get('/api/menu', function(req, res){
  res.json({
    menu:[
      {
        name: 'Five Points IPA',
        price: 5.00
      },
      {
        name: 'Beavertown Smoked port',
        price: 5.50
      },
      {
        name: 'Camden Hells',
        price: 4.70
      },
      {
        name: 'Brewdog Dead Pony',
        price: 2.50
      },
      {
        name: 'Old Rosy',
        price: 3.50
      }
    ]
  });
});

app.listen(8080, function() { // Set app to listen for requests on port 3000
  console.log('Listening on port 8080!'); // Output message to indicate server is listening
});
