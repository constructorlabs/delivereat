const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "static")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

const menu = {
  1: {
    id: 1,
    name: "Strawberry cheesecake",
    price: 6
  }
};

app.get("/", function(req, res) {
  res.render("index");
});

app.listen(8080, function() {
  console.log("Server is running at http://localhost:8080");
});
