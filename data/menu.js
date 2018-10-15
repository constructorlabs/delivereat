const menu = {
    1: {
      menuId: 1,
      name: "Mixed Salad",
      price: 6,
      type: "starter",
      image: "https://images.unsplash.com/photo-1523986371872-9d3ba2e2a389?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b6afec6bcb9eeae00384f31cc31c7e58&auto=format&fit=crop&w=1500&q=80"
    },
    2: {
      menuId: 2,
      name: "Fried chicken",
      price: 4,
      type: "starter",
      image: "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=63ec77eae2b7b81c8beab9e87bbd3a01&auto=format&fit=crop&w=1500&q=80"
    },
    3: {
      menuId: 3,
      name: "Vegetable soup",
      price: 3,
      type: "starter",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=74ac7c1aa35dc36f50cc1ac7517c70a7&auto=format&fit=crop&w=1500&q=80"
    },
    4: {
      menuId: 4,
      name: "Beef stew",
      price: 7,
      type: "main",
      image: "https://images.unsplash.com/photo-1519699788450-ad34386a3bfc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27d75234956ab719c61be2613dcfc69&auto=format&fit=crop&w=1500&q=80"
    },
    5: {
      menuId: 5,
      name: "Fish & chips",
      price: 8,
      type: "main",
      image: "https://images.unsplash.com/photo-1524334788144-6dc88da21500?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=46507e188428bfb7dbe2413ab55af741&auto=format&fit=crop&w=1500&q=80"
    },
    6: {
      menuId: 6,
      name: "Pork chops & vegetables",
      price: 3,
      type: "main",
      image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=549d2b7a71978de6e5320ba19fb4d21e&auto=format&fit=crop&w=1510&q=80"
    },
    7: {
      menuId: 7,
      name: "Blueberry cheesecake",
      price: 2,
      type: "dessert",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c57988ce931873edf1deaa6bf2cf705&auto=format&fit=crop&w=1350&q=80"
    },
    8: {
      menuId: 8,
      name: "Chocolate cake",
      price: 3,
      type: "dessert",
      image: "https://images.unsplash.com/photo-1535911765168-1fafc87dcfa3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f27e057856c0f66d60aa333118348aa1&auto=format&fit=crop&w=1047&q=80"
    },
    9: {
      menuId: 9,
      name: "Trifle",
      price: 4,
      type: "dessert",
      image: "https://images.unsplash.com/photo-1514424350208-755887f7b374?ixlib=rb-0.3.5&s=d9482c1db08ecb9766cc9c6b627ecc2e&auto=format&fit=crop&w=1050&q=80"
    }
};

// function getMenuItems () {
//   return Object.values(menu);
// }
// function getMenuItembyId (id) {
//   return menu[id];
// }

// module.exports = {
//     getMenuItems, 
//     getMenuItembyId
// }


exports.menu = menu;