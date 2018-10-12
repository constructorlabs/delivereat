const express = require("express");
const bodyParser = require("body-parser");
const {
  getDishes,
  getDishById,
} = require("./storage");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

app.get("/", function(req, res) {
  res.render("index");
});

// get dishes
app.get("/api/dishes", function(req, res) {
  const dishes = getDishes();
  res.json(dishes);
});

// get dish by ID
app.get("/api/dishes/:dishId", function(req, res) {
  const dish = getDishById(req.params.dishId);

  if (dish) {
    res.json(dish);
  } else {
    res.status(404).json({
      error: `Dish with ID ${req.params.dishId} not found`
    });
  }
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
