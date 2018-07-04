const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

const menu = {
  0: {
    id: 0,
    name: "Strawberry cheesecake",
    price: 6,
    img: "../static/cheesecake.jpg",
    desc:
      "Baked cheesecake on a sweetmeal biscuit base topped with strawberries in a sauce"
  },
  1: {
    id: 1,
    name: "Chocolate Cake",
    price: 5,
    img: "../static/chocolatecake.jpg",
    desc: "Chocolate Cake layered and topped with Belgian Chocolate Buttercream"
  },
  2: {
    id: 2,
    name: "Victoria Sponge",
    price: 7,
    img: "../static/victoriasponge.jpg",
    desc:
      "Layers of sponge sandwiched with buttercream and raspberry jam, topped with a dusting of sugar"
  },
  3: {
    id: 3,
    name: "Muffin",
    price: 3,
    img: "../static/muffin.jpg",
    desc: "Vanilla flavour mini muffins with milk chocolate chips"
  },
  4: {
    id: 4,
    name: "Crumpet",
    price: 4,
    img: "../static/crumpet.jpg",
    desc: "Soft, fluffy and deliciously gluten free"
  },
  5: {
    id: 5,
    name: "Waffles",
    price: 5,
    img: "../static/waffles.jpg",
    desc:
      "Soft, toasted waffles and their characteristic sweet, creamy caramel fillings"
  },
  6: {
    id: 6,
    name: "Custard Tart",
    price: 8,
    img: "../static/custardtart.jpg",
    desc:
      "Shortcrust pastry tarts filled with egg custard made with free range eggs, topped with nutmeg"
  },
  7: {
    id: 7,
    name: "Lemon Tart",
    price: 1,
    img: "../static/lemontart.jpg",
    desc: "Shortcrust pastry with lemon filling and a sugar dusting"
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
