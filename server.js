const express = require("express");
const bodyParser = require("body-parser");
const {
  getDishes,
  getDishById,
  getDishCategories,
  getOrders,
  getOrderById,
  createOrder
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

// get dish categories
app.get("/api/categories", function(req, res) {
  const categories = getDishCategories();
  res.json(categories);
});

// get orders
app.get("/api/orders", function(req, res) {
  const orders = getOrders();
  res.json(orders);
});

// get orders by ID
app.get("/api/orders/:orderId", function(req, res) {
  const orderId = getOrderById(req.params.orderId);

  if (orderId) {
    res.json(orderId);
  } else {
    res.status(404).json({
      error: `Order with ID ${orderId} not found`
    });
  }
});

// create new order
app.post("/api/orders", function(req, res) {
  const newOrder = req.body;
  res.json(createOrder(newOrder));
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
