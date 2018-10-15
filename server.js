const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Loads bundle.js to load ReactJs components
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

//TODO: put menu in a separate file with exported functions to create closures and protect data

const menu = {
  totalItems: 7,
  menuItems: {
    1: {
      id: 1,
      name: 'The Full Monty',
      price: 10.95,
      category: 'classics',
      description:
        'Bacon, sausage, black pudding, fried potatoes, mushrooms, beans, tomato, eggs & toast '
    },
    2: {
      id: 2,
      name: 'Butternut bubble',
      price: 9.5,
      category: 'classics',
      description:
        'Butternut squash, potato & spinach bubble with mushrooms,asparagus & avocado hollandaise'
    },
    3: {
      id: 3,
      name: 'Huevos Rancheros',
      price: 10.5,
      category: 'classics',
      description:
        'Fried eggs, tortilla, refried beans, chorizo, salsa, cheddar, sour cream & guacamole '
    },
    4: {
      id: 4,
      name: 'Reggie the Veggie',
      price: 10.95,
      category: 'classics',
      description:
        'Veggie sausage, fried potatoes, egg, mushrooms, tomato, BBQ beans & toast '
    },
    5: {
      id: 5,
      name: 'The Breakfast Burrito',
      price: 9.5,
      category: 'classics',
      description:
        'Chorizo, scrambled egg, peppers, guacamole, sour cream, cheddar, jalapeños & spicy pepper sauce '
    },
    6: {
      id: 6,
      name: 'Chorizo Hash',
      price: 9.5,
      category: 'classics',
      description:
        'Chorizo, peppers, mushrooms, caramelised crushed potatoes & poached egg with a lemon & feta sauce '
    },
    7: {
      id: 7,
      name: 'Avocado, Egg & Chesse',
      price: 5.5,
      category: 'sandwiches',
      description: 'With onions, sun-blushed tomato & sriracha mayo'
    },
    8: {
      id: 8,
      name: 'Bacon, Egg & Cheese',
      price: 5.5,
      category: 'sandwiches',
      description: 'With rocket & Virgin Mary ketchup'
    },
    9: {
      id: 9,
      name: 'Sausage, Egg & Cheese',
      price: 5.5,
      category: 'sandwiches',
      description: 'With red onion chutney'
    },
    10: {
      id: 10,
      name: 'Eggs Benedict',
      price: 9.5,
      category: 'eggs',
      description: 'With ham hock and butternut squash',
      options: ['muffin', 'butternut squash']
    },
    11: {
      id: 11,
      name: 'Eggs Florentine',
      price: 9.5,
      category: 'eggs',
      description: 'With spinach and a muffin',
      extras: ['smoked salmon'],
      extrasPrice: 4
    },
    12: {
      id: 12,
      name: 'The All American',
      price: 11.75,
      category: 'pancakes',
      description:
        'Pancakes, eggs, sausage, bacon, fried potatoes & maple syrup'
    },
    13: {
      id: 13,
      name: 'Beauregarde Pancakes',
      price: 9.5,
      category: 'pancakes',
      description:
        'Gluten free blueberry pancakes, warm blueberry & lemon compote & maple syrup'
    },
    14: {
      id: 14,
      name: 'Oatmilk Porridge',
      price: 3,
      category: 'cereal',
      description: 'Rolled oats, slow-cooked in oat milk',
      extras: [
        'mixed berries',
        'pumpkin seeds',
        'crushed pecans',
        'honey',
        'maple syrup'
      ],
      extrasPrice: 2
    },
    15: {
      id: 15,
      name: 'Huevos Al Joe',
      price: 10.5,
      category: 'eggs',
      description:
        'Poached eggs, peppers, avocado, chillies & hollandaise on English muffin with a choice of fried chicken or chorizo',
      extras: ['fried chicken', 'chorizo'],
      extrasPrice: 0
    }
  }
};

// create a new object / array to store orders

let orders = {
  totalOrders: 0,
  customerOrders: {}
};

// handles first request from the user to localhost:8080 and call the index.hbs view to return an HTML page to the user
app.get('/', function(req, res) {
  res.render('index');
});

// get minimal menu item details
app.get('/api/menu', function(req, res) {
  const menuItems = Object.values(menu.menuItems).map(item => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category
    };
  });
  if (menuItems.length != 0) {
    res.json(menuItems);
  } else {
    res.status(404).json({ error: 'Sorry, there are no items on the menu' });
  }
});

// get individual item details
app.get('/api/menu/:itemId', function(req, res) {
  const itemDetails = menu.menuItems[req.params.itemId];
  if (itemDetails) {
    res.json(itemDetails);
  } else {
    res.status(404).json({ error: 'Sorry, item not found' });
  }
});

// TODO: rework this to not use user submitted price to calculate the cost - get the cost from the menu data object ont he server side. Only send data back to the server that is needed and cannot be derived / calculated

// post to /orders endpoint

app.post('/api/orders', function(req, res) {
  const order = req.body;
  const ordersKeys = Object.keys(orders.customerOrders);
  const id = ordersKeys.length > 0 ? Math.max(...ordersKeys) + 1 : 1;
  orders.customerOrders = Object.assign({}, orders.customerOrders, {
    [id]: order
  });
  // respond with order object with id attached
  res.json({ [id]: order });
});

//get all orders for admin
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// get order by id for customer order tracking
app.get('/api/orders/:orderId', (req, res) => {
  res.json(orders.customerOrders[req.params.orderId]);
});

// Server code is running in the server
app.listen(8080, function() {
  console.log('Listening on port 8080');
});
