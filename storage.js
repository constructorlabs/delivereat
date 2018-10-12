const storage = {
  menu: {
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

function getMenu() {
    return Object.values(storage.menu);
}

function getMenuById(menuId) {
    return storage.menu[menuId];
}

function createMenuItem(newMenuItem) {
    const allIds = Object.keys(storage.menu);
    const highestId = Math.max(...allIds);
    const newMenuId = highestId + 1;

    const menuItemToSave = Object.assign(newMenuItem, { id: newMenuId })
    storage.menu[newMenuId] = menuItemToSave;
    return menuItemToSave;
}

// TODO: add replace, patch and delete

// function replaceMenuItem(menuId, replacementMenuItem)  {
//     storage.menu[menuId] = replacementMenuItem;
//     return replacementMenuItem;
// }

// function patchMenuItem() {

// }

// function deleteMenuItem() {

// }

module.exports = {
    getMenu,
    getMenuById,
    createMenuItem,
    replaceMenuItem,
    patchMenuItem,
    deleteMenuItem
}