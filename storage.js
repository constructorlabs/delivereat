const storage = {
  dishes: {
    1: {
      dishId: 1,
      name: "Chicken Caesar Salad",
      category: "Salads",
      description: "",
      price: 6.55,
      imageUrl: "",
      inStock: true,
    },
    2: {
      dishId: 2,
      name: "Grilled Chicken Breast Burger",
      category: "Burgers",
      description: "",
      price: 5.75,
      imageUrl: "",
      inStock: true
    },
    3: {
      dishId: 3,
      name: "Classic 6 oz. Beef Burger",
      category: "Burgers",
      description: "",
      price: 5.75,
      imageUrl: "",
      inStock: true
    },
    4: {
      dishId: 4,
      name: "Beer-Battered Onion Rings (6 Pc.)",
      category: "Sides",
      description: "",
      price: 1.4,
      imageUrl: "",
      inStock: true
    },
    5: {
      dishId: 5,
      name: "Bowl of Chips",
      category: "Sides",
      description: "",
      price: 2.8,
      imageUrl: "",
      inStock: true
    },
    6: {
      dishId: 6,
      name: "Millionaire Sundae",
      category: "Desserts",
      description: "",
      price: 3.6,
      imageUrl: "",
      inStock: true
    },
    7: {
      dishId: 7,
      name: "Coke",
      category: "Drinks",
      description: "",
      price: 1.2,
      imageUrl: "",
      inStock: true
    },
    8: {
      dishId: 8,
      name: "Fanta",
      category: "Drinks",
      description: "",
      price: 1.2,
      imageUrl: "",
      inStock: true
    }
  },
  orders: {
    100: {}
  }
};

function getDishes() {
  return storage.dishes;
}

function getDishById(dishId) {
  return storage.dishes[dishId];
}

function getDishCategories() {
  let categories = {};

  for (let item in storage.dishes) {
    let dish = storage.dishes[item];
    let category = storage.dishes[item].category;

    if (categories.hasOwnProperty(category)) {
      categories[category].push(dish);
    } else {
      categories[category] = [dish];
    }
  }
  return categories;
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

  let total = 0;

  Object.keys(newOrder).map(dish => {
    let subTotal = newOrder[dish].price * newOrder[dish].quantity;

    newOrder[dish].subTotal = Number(subTotal);

    total += Number(subTotal);
  });

  const orderToSave = Object.assign(
    { dishes: newOrder },
    { orderId: newOrderId },
    { deliveryFee: Number(2.5) },
    { total: Number(total) }
  );
  storage.orders[newOrderId] = orderToSave;
  return orderToSave;
}

module.exports = {
  getDishes,
  getDishById,
  getDishCategories,
  getOrders,
  getOrderById,
  createOrder
};
