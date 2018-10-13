const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Loads bundle.js to load ReactJs components
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const menu = {
  totalItems: 7,
  menuItems: {
    1: {
      id: 1,
      name: 'bacon roll',
      price: 4,
      description: 'grilled bacon in a soft bap'
    },
    2: {
      id: 2,
      name: 'bacon & egg roll',
      price: 5,
      description:
        'our outdoor-reared bacon with a fried free-range egg in a soft bap'
    },
    3: {
      id: 3,
      name: 'sausage sandwich',
      price: 4,
      description: 'two herby pork sausages in a bap'
    },
    4: {
      id: 4,
      name: 'scrambled eggs',
      price: 4,
      description: 'three free-range eggs scrambled with butter and cream'
    },
    5: {
      id: 5,
      name: 'toast & jam',
      price: 3,
      description:
        'two sourdough slices, lightly toasted with a small pot of seasonal jam'
    },
    6: {
      id: 6,
      name: 'toast (2 slices)',
      price: 2,
      description: 'two sourdough slices, lightly toasted'
    },
    7: {
      id: 7,
      name: 'avocado & toast',
      price: 5,
      description:
        'mashed organic avocado with feta and a touch of chilli plus a slice of lightly toasted sourdough'
    }
  }
};

let orders = {
  totalOrders: 0,
  customerOrders: {}
};

// create a new object / array to store orders

// handles first request from the user to localhost:8080 and call the index.hbs view to return an html page to the useri

app.get('/', function(req, res) {
  res.render('index');
});

// get minimal menu item details
app.get('/api/menu', function(req, res) {
  const menuItems = Object.values(menu.menuItems).map(item => {
    return { id: item.id, name: item.name, price: item.price };
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

app.post('/api/order', function(req, res) {
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
app.get('/orders', (req, res) => {
  res.json(orders);
});

// get order by id for customer order tracking
app.get('/orders/:orderId', (req, res) => {
  res.json(orders.customerOrders[req.params.orderId]);
});

// Server code is running in the server
app.listen(8080, function() {
  console.log('Listening on port 8080');
});
