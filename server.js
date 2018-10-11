const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const menu = {
  1: {
    id: 1,
    name: "Strawberry cheesecake",
    price: 6
  }
};

app.get('/', function(req, res){
  res.render('index');
});

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
