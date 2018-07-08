const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

let orders = {};
let id = 1;

let messID = 1;

const menu = {
  1: {
    id: 1,
    name: "Original Doughnut",
    price: 2,
    img: "./static/images/original-donut.jpg"
  },

  2: {
    id: 2,
    name: "Chocolate Twist Doughnut",
    price: 3.5,
    img: "./static/images/chocolate-twist.png"
  },

  3: {
    id: 3,
    name: "Giant Amsterdam Doughnut",
    price: 4.2,
    img: "./static/images/giant-donut.jpg"
  },

  4: {
    id: 4,
    name: "Victoria Sponge Cake",
    price: 10,
    img: "./static/images/victoria-sponge.jpg"
  },

  5: {
    id: 5,
    name: "Carrot Cake",
    price: 12.5,
    img: "./static/images/carrot-cake.jpg"
  },

  6: {
    id: 6,
    name: "Chocolate Cake",
    price: 10,
    img: "./static//images/choco-cake.jpg"
  },

  7: {
    id: 7,
    name: "Apple Puffs",
    price: 2,
    img: "./static/images/apple-puffs.jpg"
  },

  8: {
    id: 8,
    name: "Belgian Buns",
    price: 2,
    img: "./static/images/belgian-buns.jpg"
  },

  9: {
    id: 9,
    name: "Pastry Assortment",
    price: 5.5,
    img: "./static/images/assorted.jpeg"
  },

  10: {
    id: 10,
    name: "PG Tips Tea",
    price: 2,
    img: "./static/images/pg-tips.jpg"
  },

  11: {
    id: 11,
    name: "Soft Drinks",
    price: 2,
    img: "./static/images/soft-drinks.jpg"
  },

  12: {
    id: 12,
    name: "Hamzah's Hot Chocolate",
    price: 4.2,
    img: "./static/images/hot-chocolate.jpg"
  }
};

let messages = {
  1: {
    message: "Baked delivery has been a god send, portions are excellent!",
    person: "Bob Marvey"
  },

  2: {
    message:
      "The hot chocoalte is a real treat, do yourself a favour and order one. Goes fab with the original donut.",
    person: "Steve Rogers"
  },

  3: {
    message:
      "Delivery was super quick, ordered at 4 and it was on my desk by 4:20. Delivery bloke was super chilled as well.",
    person: "Clare Kurdi"
  }
};

app.get("/menu-items", function(req, res) {
  res.json(menu);
});

app.get("/api/messages", function(req, res) {
  res.json(messages);
});

app.post("/api/messages", function(req, res) {
  console.log(req.body);
  let messageID = `Message${messID}`;
  messID++;
  let tempMessage = { [messageID]: req.body.result };
  messages = Object.assign({}, messages, tempMessage);
  console.log(messages);
  res.json(messages);
});

app.post("/api/orders", (req, res) => {
  let orderID = `Orders${id}`;
  id++;
  const tempOrder = { [orderID]: req.body };
  orders = Object.assign({}, orders, tempOrder);
  res.json(orders);
});

app.get("/api/orders", function(req, res) {
  res.json(orders);
});

app.delete("/api/orders/:id", (req, res) => {
  delete orders[req.params.id];
  res.json(orders);
});

app.get("*", function(req, res) {
  res.render("index");
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`Listening on port number ${port}`);
});
