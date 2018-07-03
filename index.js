const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

const menu = {
  1: {
    id: 1,
    name: "Strawberry cheesecake",
    price: 6
  },
  2: {
    id: 2,
    name: "Chocolate Cake",
    price: 5
  },
  3: {
    id: 3,
    name: "Victoria Sponge",
    price: 7
  },
  4: {
    id: 4,
    name: "Scone",
    price: 3
  },
  5: {
    id: 5,
    name: "Crumpet",
    price: 4
  }
};

const orders = {};

app.get("/", function(req, res) {
  res.render("index");
});

//// Gets all menu items
app.get("/menu", function(req, res) {
  res.json(menu);
});

//// Gets specific menu item
function getItem(menu, item) {
  return menu[item];
}
app.get("/menu/:item", function(req, res) {
  const menuItem = getItem(menu, req.params.item);
  res.json(menuItem);
});

/// Create new order
function createOrder(newOrder) {
  const lastId = Object.keys(orders).pop();
  const id = lastId ? lastId : 0;
  const newId = +id + 1;
  newOrder.id = newId;
  orders[newId] = newOrder;
  return newOrder;
}

app.post("/order", function(req, res) {
  const newReq = createOrder(req.body);
  res.json(orders);
});

//// Gets all orders
app.get("/order", function(req, res) {
  res.json(orders);
});

//// Gets specific order
function getOrderByNumber(orders, order) {
  return orders[order];
}

app.get("/order/:orderNum", function(req, res) {
  const specificOrder = getOrderByNumber(orders, req.params.orderNum);

  if (specificOrder) {
    res.json(specificOrder);
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

// Server Listener
app.listen(8080, function() {
  console.log("Listening on port 8080");
});
