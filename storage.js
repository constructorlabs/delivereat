const storage = {
  dishes: {
    1: {
      id: 1,
      name: "Chicken Caesar Salad",
      type: "Salads",
      description: "",
      price: 6.55,
      imageUrl: "",
      inStock: true
    },
    2: {
      id: 2,
      name: "Grilled Chicken Breast Burger",
      type: "Burgers",
      description: "",
      price: 5.75,
      imageUrl: "",
      inStock: true
    },
    3: {
      id: 3,
      name: "Classic 6 oz. Beef Burger",
      type: "Burgers",
      description: "",
      price: 5.75,
      imageUrl: "",
      inStock: true
    },
    4: {
      id: 4,
      name: "Beer-Battered Onion Rings (6 Pc.)",
      type: "Sides",
      description: "",
      price: 1.4,
      imageUrl: "",
      inStock: true
    },
    5: {
      id: 5,
      name: "Bowl of Chips",
      type: "Sides",
      description: "",
      price: 2.8,
      imageUrl: "",
      inStock: true
    },
    6: {
      id: 6,
      name: "Millionaire Sundae",
      type: "Desserts",
      description: "",
      price: 3.6,
      imageUrl: "",
      inStock: true
    },
    7: {
      id: 7,
      name: "Coke",
      type: "Drinks",
      description: "",
      price: 1.2,
      imageUrl: "",
      inStock: true
    },
    8: {
      id: 8,
      name: "Fanta",
      type: "Drinks",
      description: "",
      price: 1.2,
      imageUrl: "",
      inStock: true
    }
  }
};

function getDishes() {
    return Object.values(storage.dishes);
}

function getDishById(dishId) {
    return storage.dishes[dishId];
}

function createDish(newDish) {
    const allIds = Object.keys(storage.dishes);
    const highestId = Math.max(...allIds);
    const newDishId = highestId + 1;

    const dishToSave = Object.assign(newDish, { id: newDishId })
    storage.Dishes[newDishId] = dishToSave;
    return dishToSave;
}


module.exports = {
    getDishes,
    getDishById,
}