const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');


const menu = {

  burgers: {
    1: {
      id: 1,
      name: 'Beefburger',
      price: 10
    },

    2: {
      id: 2,
      name: "Cheeseburger",
      price: 11
    },

    3: {
      id: 3,
      name: "Stiltonburger",
      price: 13
    },

    4: {
      id: 4,
      name: "Lamb burger",
      price: 12
    }

  },

  sides: {
    5: {
      id: 5,
      name: 'Chips',
      price: 4
    },

    6: {
      id: 6,
      name: 'Onion rings',
      price: 4
    },

    7: {
      id: 7,
      name: 'Cajun fries',
      price: 5
    },

    8: {
      id: 8,
      name: 'Coleslaw',
      price: 2
    }

  },

  desserts: {
    9: {
      id: 9,
      name: 'Strawberry Cheesecake',
      price: 7
    },

    10: {
      id: 10,
      name: 'Churros',
      price: 7
    },

    11: {
      id: 11,
      name: 'Icecream',
      price: 7
    }
  },

  drinks: {
    12: {
      id: 12,
      name: 'lemonade',
      price: 3
    },

    13: {
      id: 13,
      name: 'cola',
      price: 3
    }
  }


};

const orders = {};
let nextOrderId = 1;

app.get('/', function(req, res){
  res.render('index');
});


app.get('/api/menu',(req, res) => {
  return res.json(menu)
} )

app.post('/api/order', (req, res) => {
  const newOrder = {id:nextOrderId,
    order: req.body
  }
  Object.assign(orders,{ [nextOrderId]:newOrder})
  nextOrderId++;
  return res.json(newOrder)
})

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
