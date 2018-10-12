const express = require("express");
const bodyParser = require("body-parser");
const {
  getMenu,
  getMenuById,
  createMenuItem,
  replaceMenuItem,
  patchMenuItem,
  deleteMenuItem
} = require("./storage");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

app.get("/", function(req, res) {
  res.render("index");
});

// get Menu
app.get("/api/menu", function(req, res) {
  const menu = getMenu();
  res.json(menu);
});

// get Menu Item by ID
app.get("/api/menu/:menuId", function(req, res) {
  const menu = getMenuById(req.params.menuId);

  if (menu) {
    res.json(menu);
  } else {
    res.status(404).json({
      error: `Menu with ID ${req.params.menuId} not found`
    });
  }
});

// create menu item
app.post("/api/menu", function(req, res) {
  const newMenuItem = req.body;
  res.json(createMenuItem(newMenuItem));
});

// // replace menu item
// app.put("/api/menu:menuId", function(req, res) {
//   const replacementMenuItem = req.body;
//   res.json(replaceMenuItem(req.params.menuId, replacementMenuItem));
// });

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
