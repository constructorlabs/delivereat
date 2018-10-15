const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

const menu = [
  {
    id: "S1",
    name: "Garlic Bread",
    price: 2.5,
    type: "Side",
    nutrition: {
      fat: 16.3,
      carbs: 41.3,
      protein: 7.6,
      per: "slice"
    }
  },

  {
    id: "S2",
    name: "Wings",
    price: 2.5,
    type: "Side",
    nutrition: {
      fat: 0,
      carbs: 0,
      sugars: 0,
      protein: 0,
      per: "wing"
    }
  },

  // {
  //   id: "S3",
  //   name: "Chips",
  //   price: 1,
  //   type: "Side"
  // },

  {
    id: "M1",
    name: "Chicken Burger",
    price: 5.0,
    type: "Main",
    nutrition: {
      fat: 0,
      carbs: 0,
      sugars: 0,
      protein: 0,
      per: "burger"
    }
  },

  {
    id: "M2",
    name: "Beef Burger",
    price: 5.0,
    type: "Main",
    nutrition: {
      fat: 0,
      carbs: 0,
      sugars: 0,
      protein: 0,
      per: "burger"
    }
  },
  // {
  //   id: "M3",
  //   name: "Ribs",
  //   price: 6,
  //   type: "Main"
  // },
  {
    id: "D1",
    name: "Strawberry Cheesecake",
    price: 6.0,
    type: "Desert",
    nutrition: {
      fat: 0,
      carbs: 0,
      sugars: 0,
      protein: 0,
      per: "slice"
    }
  },

  {
    id: "D2",
    name: "Ice Cream",
    price: 4.5,
    type: "Desert",
    nutrition: {
      fat: 0,
      carbs: 0,
      sugars: 0,
      protein: 0,
      per: "serving"
    }
  }
];
let nextOrderId = 1;
let orders = {};

function getMenu() {
  return menu;
}

function addDish(id, dishName, dishPrice, dishType) {
  [dishName] = { id: id, name: dishName, price: dishPrice, type: dishType };
  return menu.push([dishName]);
}

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/api/menu", function(req, res) {
  const menu = getMenu();
  res.json(menu);
});

app.post("/api/menu/:id/:name/:price/:type", function(req, res) {
  addDish(req.params.id, req.params.name, req.params.price, req.params.type);
  const menu = getMenu();
  res.json(menu);
});

app.post("/api/order", function(req, res) {
  console.log(req.body);
  orders[nextOrderId] = {
    id: nextOrderId,
    order: req.body
  };

  res.json(orders[nextOrderId]);
  nextOrderId++;
});

app.get("/api/order/:orderId", function(req, res) {});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
