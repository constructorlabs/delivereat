const storage = {
  dishes: {
    1: {
      dishId: 1,
      name: "Chicken Caesar Salad",
      type: "Salads",
      description: "",
      price: 6.55,
      imageUrl: "",
      inStock: true
    },
    2: {
      dishId: 2,
      name: "Grilled Chicken Breast Burger",
      type: "Burgers",
      description: "",
      price: 5.75,
      imageUrl: "",
      inStock: true
    },
    3: {
      dishId: 3,
      name: "Classic 6 oz. Beef Burger",
      type: "Burgers",
      description: "",
      price: 5.75,
      imageUrl: "",
      inStock: true
    },
    4: {
      dishId: 4,
      name: "Beer-Battered Onion Rings (6 Pc.)",
      type: "Sides",
      description: "",
      price: 1.4,
      imageUrl: "",
      inStock: true
    },
    5: {
      dishId: 5,
      name: "Bowl of Chips",
      type: "Sides",
      description: "",
      price: 2.8,
      imageUrl: "",
      inStock: true
    },
    6: {
      dishId: 6,
      name: "Millionaire Sundae",
      type: "Desserts",
      description: "",
      price: 3.6,
      imageUrl: "",
      inStock: true
    },
    7: {
      dishId: 7,
      name: "Coke",
      type: "Drinks",
      description: "",
      price: 1.2,
      imageUrl: "",
      inStock: true
    },
    8: {
      dishId: 8,
      name: "Fanta",
      type: "Drinks",
      description: "",
      price: 1.2,
      imageUrl: "",
      inStock: true
    }
  },
  orders: {
    100: {

    }
  }
};

function getDishes() {
  return storage.dishes;
}

function getDishById(dishId) {
  return storage.dishes[dishId];
}

function getOrders() {
  return storage.orders;
}

function getOrderById(orderId) {
  return storage.orders[orderId];
}

function createOrder(newOrder) {
  const allIds = Object.keys(storage.orders);
  const highestId = Math.max(...allIds);
  const newOrderId = highestId + 1;

  const orderToSave = Object.assign(newOrder, {id: newOrderId});
  storage.orders[newOrderId] = orderToSave;
  return orderToSave;
}

module.exports = {
  getDishes,
  getDishById,
  getOrders,
  getOrderById,
  createOrder
};
