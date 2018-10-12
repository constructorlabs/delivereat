const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const menu = {
  1: {
    id: 1,
    name: "Strawberry cheesecake",
    price: 6
  },
  2: {
    id: 2,
    name: "Chocolate cake",
    price: 5
  },
  3: {
    id: 3,
    name: "Cream cake",
    price: 4
  },
  4: {
    id: 4,
    name: "Angel cake",
    price: 3
  },
  5: {
    id: 5,
    name: "Slim cake",
    price: 2
  }
};
