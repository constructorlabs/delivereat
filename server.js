const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

const storage = {
  menu: [
    {
      id: "S1",
      name: "Garlic Bread",
      price: 2.5,
      type: "Side"
    },

    {
      id: "S2",
      name: "Wings",
      price: 2.5,
      type: "Side"
    },

    {
      id: "M1",
      name: "Chicken Burger",
      price: 5.0,
      type: "Main"
    },

    {
      id: "M2",
      name: "Beef Burger",
      price: 5.0,
      type: "Main"
    },

    {
      id: "D1",
      name: "Strawberry cheesecake",
      price: 6,
      type: "Desert"
    },

    {
      id: "D2",
      name: "Ice-Cream",
      price: 4.5,
      type: "Desert"
    }
  ]
};

function getMenu() {
  return storage;
}

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/api/menu", function(req, res) {
  const menu = getMenu();
  res.json(menu);
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
