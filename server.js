const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

// Menu list
function getMenu() {
  const menu = {
    1: {
      id: 1,
      name: "Strawberry cheesecake",
      price: 2,
      image: "./static/imgs/dishes/cake.jpg",
      ingredients: ['Strawberries', 'Cheese', 'Cream']
    },
    2: {
      id: 2,
      name: "Paella",
      price: 6,
      image: "./static/imgs/dishes/paella.jpg",
      ingredients: ['Rice', 'Seafood', 'Stuff']
    },
    3: {
      id: 3,
      name: "Pizza",
      price: 8,
      image: "./static/imgs/dishes/pizza.jpg",
      ingredients: ['Mozzarella', 'Tomato', 'Basil', 'Mushrooms', 'Green Pepper']
    },
    4: {
      id: 4,
      name: "Gazpacho",
      price: 3,
      image: "./static/imgs/dishes/gazpacho.jpg",
      ingredients: ['Red Tomatos', 'Cucumber', 'Garlic', 'Red Pepper', 'Olive Oil', 'Wine vinager', 'Salt', 'Blavck Pepper']
    }
  };


  return {
    showMenu() {
      return menu;
    },

    showDish() {
      // return menu;
    },

    addToMenu() {
      // return menu;
    }
  };
}
const { showMenu, showDish } = getMenu();

// Render index.hbs template
app.get('/', function (req, res) {
  res.render('index');
});

// Get menu
app.get('/api/menu', function (req, res) {
  if (showMenu()) {
    res.json(showMenu());
  } else {
    res.status(404).json({ error: 'Menu not found' });
  }
});

// Get requested dish
app.get('/api/menu/:menuId', function (req, res) {
  if (showDish()) {
    res.json(showDish());
  } else {
    res.status(404).json({ error: 'Menu not found' });
  }
});


// Server stuff
app.listen(8080, function () {
  console.log('Listening on port 8080');
});
