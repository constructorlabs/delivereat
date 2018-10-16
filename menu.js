const menu = {
  1: {
    id: 1,
    name: "Espresso",
    description: "Single shot, 30ml",
    price: 2.00
  },
  2: {
    id: 2,
    name: "Ristretto",
    description: "Concentrated espresso, 22ml",
    price: 2.00
  },
  3: {
    id: 3,
    name: "Macchiato",
    description: "60ml espresso + a dab of milk foam",
    price: 2.20
  },
  4: {
    id: 4,
    name: "Cortado",
    description: "60ml espresso + 30ml milk foam",
    price: 2.40
  },
  5: {
    id: 5,
    name: "Cappuccino",
    description: "60ml espresso + 60ml steamed milk + 60ml milk foam",
    price: 2.50
  },
  6: {
    id: 6,
    name: "Americano",
    description: "60ml espresso + 90ml hot water",
    price: 2.30
  },
  7: {
    id: 7,
    name: "Flat White",
    description: "60ml espresso + 120ml steamed milk",
    price: 2.50
  },
  8: {
    id: 8,
    name: "Latte",
    description: "60ml espresso + 180ml steamed milk + 2ml milk foam",
    price: 2.50
  },
  9: {
    id: 9,
    name: "Mocha",
    description: "60ml espresso + 60ml chocolate + 30ml steamed milk",
    price: 2.90
  }
};

function getAllMenuItems() {
  return Object.values(menu);
}

function getMenuItemById(menuItemId) {
  return menu[menuItemId];
}

module.exports = {getAllMenuItems, getMenuItemById};