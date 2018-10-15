// #2
function showMenu() {

  const min = 1;
  const max = 100;

  // function getRandomInt(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;


  const menu = {
    1 : {
      id: Math.floor(Math.random() * (max - min + 1)) + min,
      name: "Strawberry cheesecake",
      price: 6,
      image: "http://www.fnstatic.co.uk/images/content/recipe/simply-delicious-strawberry-cake.jpg"
    },
    2 : {
      id: Math.floor(Math.random() * (max - min + 1)) + min,
      name: "Chocolate cake",
      price: 5,
      image:'https://foodess.com/wp-content/uploads/2011/12/MTMxNTk1NDA2NDU4MDAwNjU4.jpg'
    },
    3 : {
      id: Math.floor(Math.random() * (max - min + 1)) + min,
      name: "Cream cake",
      price: 4,
      image: 'https://www.mommyhatescooking.com/wp-content/uploads/2015/09/pumpkin-pie-cake-7-600x844.jpg'
    },
    4 : {
      id: Math.floor(Math.random() * (max - min + 1)) + min,
      name: "Angel cake",
      price: 3,
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/angel_food_cake_with_04002_16x9.jpg'
    },
    5 : {
      id: Math.floor(Math.random() * (max - min + 1)) + min,
      name: "Layer cake",
      price: 2,
      image: 'https://images-gmi-pmc.edge-generalmills.com/26668aa9-c04f-4e8c-be11-5c0c11df29b6.jpg'
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
