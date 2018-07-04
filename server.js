const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

let orders = {};
let id = 1;

const menu = {
  1: {
    id: 1,
    name: "Spacecake",
    price: 4.2,
    img: "./static/images/spacecakes.jpeg"
  },

  2: {
    id: 2,
    name: "Happy Pizza",
    price: 14.2,
    img: "./static/images/pizza.jpg"
  },

  3: {
    id: 3,
    name: "Burger Joint",
    price: 14.2,
    img: "./static/images/burger.jpg"
  },

  4: {
    id: 4,
    name: "Baked Potato",
    price: 13.2,
    img: "./static/images/baked.png"
  },

  5: {
    id: 5,
    name: "Pineapple Express",
    price: 8,
    img: "./static/images/pineapple.jpg"
  },

  6: {
    id: 6,
    name: "Hash Brownies",
    price: 8.4,
    img: "./static//images/hashbrownies.jpg"
  },

  7: {
    id: 7,
    name: "Sour Gummybears",
    price: 10,
    img: "./static/images/gummybears.jpg"
  },

  8: {
    id: 8,
    name: "Chocolate-Trip Ice Cream",
    price: 6,
    img: "./static/images/chocotrip.jpg"
  },

  9: {
    id: 9,
    name: "Relaxation Mints",
    price: 3,
    img: "./static/images/mints.jpg"
  },

  10: {
    id: 10,
    name: "Sweet-Grass Juice",
    price: 7,
    img: "./static/images/juice.jpeg"
  },

  11: {
    id: 11,
    name: "Keefa Cola",
    price: 3,
    img: "./static/images/keefcola.png"
  },

  12: {
    id: 12,
    name: "Cannapunch",
    price: 4,
    img: "./static/images/cannapunch.jpg"
  },

  13: {
    id: 13,
    name: "Hammy's House Special",
    tag: "* Not for the faint-hearted *",
    price: 44.22,
    img: "./static/images/housespecial.jpg"
  }
};

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/menu", function(req, res) {
  res.json(menu);
});

app.post("/makeOrder", (req, res) => {
  let orderID = `Orders${id}`;
  id++;
  const tempOrder = { [orderID]: req.body };
  orders = Object.assign({}, orders, tempOrder);
  res.json(orders);
});

app.get("/order", function(req, res) {
  res.json(orders);
});

app.delete("/deleteOrder", (req, res) => {
  delete orders[req.body.toDelete];
  res.json(orders);
});

// Git test

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
