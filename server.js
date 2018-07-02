const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');
/////////////////////////////////////////////////////
let id=1;


function menu(){

  const menu = [
    {
      id: 1,
      name: "Cappuccino",
      price: 3,
      img: "./static/images/cap.jpeg"
    },
     {
      id: 2,
      name: "Americano",
      price: 2,
      img: "./static/images/amerc.jpg"
    }, 
    {
      id:3,
      name: "espresso",
      price: 2,
      img: "./static/images/esp.jpg"
    },
    {
      id:4,
      name: "Latte",
      price: 4,
      img: "./static/images/latte.jpg"
    },
    {
      id:5,
      name: "Tea",
      price: 5,
      img: "./static/images/tea.jpg"
    },
    {
      id:6,
      name: "Glorious Coffee Maker",
      price: 100,
      img: "./static/images/maker.jpg"
    },
    {
    id:7,
      name: "Coruscant",
      price: 2,
      img: "./static/images/cor.jpg"
    }
  ];
  

  function innerMenu(){
    return menu;
  }
  return innerMenu;
}
/////////////////////////////////////////////////////

function orders (){
  let orders={};

  const ordering= {
   addOrder(order){
    orders= Object.assign({},orders,order);
    return orders;
  }
,
   getOrders(){
    return orders;
  }
  ,
  deleteOrder(id){
    delete orders[id.toDelete];
    return orders;
  }
}
  return (ordering);
}
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////

const getMenu= menu();
const order = orders();



app.get('/', function(req, res){
 res.sendfile("./static/index.html");
});

app.get('/api', function(req, res){
  
  res.json({menu: getMenu(), orders: order.getOrders()});
});

app.get('/menu', function(req, res){
  
  res.json(getMenu());
});

app.get('/orders', function(req, res){
  
  res.json(order.getOrders());
});

app.get('/counter', function(req, res){
  
  res.json(counter);
});


app.post('/api/order/', function(req, res){
  let orderId= `Order${id}`
  id++;
  res.json(order.addOrder({[orderId]:req.body}));
});


app.delete('/api/delete/', function(req, res){
  res.json(order.deleteOrder(req.body));
});


app.listen(8080, function(){
  console.log('Listening on port 8080');
});
