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
    price: 6,
  },
  2: {
    id: 2,
    name: "Chocolate Cake",
    price: 5,
  }
};

app.get('/', function(req, res){
  res.render('index');
});

//// Gets all menu items
app.get('/menu', function(req, res){
  res.json(menu);
})

//// Gets specific menu item
function getItem( menu, item){
  return menu[item];
}
app.get('/menu/:item', function(req, res){
  const menuItem = getItem(menu, req.params.item);
  res.json(menuItem);
})


// Server Listener
app.listen(8080, function(){
  console.log('Listening on port 8080');
});
