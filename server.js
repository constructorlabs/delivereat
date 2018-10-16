const express = require("express");
const bodyParser = require("body-parser");
const menu = require('./menuStorage');
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

const menuMethods = menu();

function orders() {
  let order = {};

  const orderMethods = {
    addOrder(incomingOrder) {
      let nextId;
      const orderIds = Object.keys(order);
      orderIds.length === 0
        ? (nextId = 1)
        : (nextId = Math.max(...orderIds) + 1);
      order[nextId] = {
        id: nextId,
        orderItems: incomingOrder.orderItems,
        orderTotal: incomingOrder.orderTotal
      };
      return order[nextId];
    }
  };
  return orderMethods;
}

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/api/menu", function(req, res) {
  const currentMenu = menuMethods.retrieveMenu();
  res.json(currentMenu);
});

app.post("/api/order", (req, res) => {
  const orderMethods = orders();
  const newOrder = orderMethods.addOrder(req.body);
  res.json(newOrder);
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
