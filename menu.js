// #2
function showMenu() {

  const menu = {
    1 : {
      id: 1,
      name: "Strawberry cheesecake",
      price: 6
    },
    2 : {
      id: 2,
      name: "Chocolate cake",
      price: 5
    },
    3 : {
      id: 3,
      name: "Cream cake",
      price: 4
    },
    4 : {
      id: 4,
      name: "Angel cake",
      price: 3
    },
    5 : {
      id: 5,
      name: "Slim cake",
      price: 2
    }
  }

const menuFunctions = {

  // #2 Works
  getMenu () {
    return Object.values(menu);
  },

  // #3 Works
  getMenuItem(id) {
    const foodItem = Object.values(menu).find( item => item.id === parseInt(id));
    if (!menu) {
      return null;
    } else {
    return foodItem;
  }
}

}

  return menuFunctions;
}

 module.exports = showMenu;
