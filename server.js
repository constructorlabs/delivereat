const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

const menu = {
  1: {
    id: 1,
    name: "Regular Burger",
    price: 8.0
  },
  2: {
    id: 2,
    name: "Irregular Burger",
    price: 9.5
  },
  3: {
    id: 3,
    name: "Spectacular Burger",
    price: 10.5
  },
  4: {
    id: 4,
    name: "Incrediburger",
    price: 12.0
  }
};

let order = {};

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/api/menu", function(req, res) {
  res.json(menu);
});

app.post("/api/order", (req, res) => {
  let nextId;
  const orderIds = Object.keys(order);
  orderIds.length === 0 ? (nextId = 1) : (nextId = Math.max(...orderIds) + 1);
  order[nextId] = {
    id: nextId,
    orderItems: req.body.orderItems,
    orderTotal: req.body.orderTotal
  };
  res.json(order[nextId]);
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
