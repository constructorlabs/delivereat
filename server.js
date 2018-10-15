const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const shortid = require('shortid')

// import the built-in filesystem module from node.js
const fs = require('fs')

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


//in lieu of an actual database, Jim helpfully provided the following code such that
//I can create a mock db. This is required so I can attempt a "most popular orders" function
let orders = {}
try {
  // try to read existing JSON database file
  orders = JSON.parse(fs.readFileSync('./orders-db.json', 'utf8'))
} catch (error) {
  // if the file doesn't exist
  if (error.code === 'ENOENT') {
    console.info('No existing orders database');
  } else {
    console.warn('While loading orders database:', error.message)
  }
}



// This is very messy
function getMostPopularOrders(){
  let popOrders = {}
  let orderIdArray = Object.values(orders)
    .map(item => {
      return Object.keys(orders[item.id].order.items)
    })
    .reduce((acc,item) => acc.concat(item))


  //remove categories (burgers, sides, etc.) for easier operation
  const flatMenu = Object.assign({}, ...Object.values(menu))


//helper function to count occurances of item in order list
  function countOccurances(array, element){
    return array.filter(item => item === element).length
  }

  const mostPopArray = orderIdArray.filter(item => countOccurances(orderIdArray, item) > 1)
  const mostPopularOrders = mostPopArray
    .map(item => {
      return (flatMenu[item])
    })
    .reduce((acc,item)=> {
      popOrders[item.id] = item
      return popOrders
    }, {})

  return popOrders


}



app.get('/', function(req, res){
  res.render('index');
});


app.get('/api/menu',(req, res) => {
  const popular = getMostPopularOrders()
  const menuWithPopular = {popular, ...menu}
  return res.json(menuWithPopular)
} )

app.post('/api/order', (req, res) => {
  const newOrder = {id: shortid.generate(),
    order: req.body
  }
  Object.assign(orders,{ [newOrder.id]:newOrder})
  console.log(orders)
  fs.writeFileSync('./orders-db.json', JSON.stringify(orders, null, 2), 'utf8')

  return res.json(newOrder)
})

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
