/// resources - nouns ///
const storage = {
    menu : {
      1: {
        id: 1,
        name: "Cappucino",
        price: 2.30,
        category: "drinks",

      },
      2: {
        id: 2,
        name: "Latte",
        price: 2.30,
        category: "drinks",

      }, 
      3: {
        id: 3,
        name: "Flat White",
        price: 2.30,
        category: "drinks",

      }, 
      4: {
        id: 4,
        name: "Cortado",
        price: 2.00,
        category: "drinks",

      }, 
      5: {
        id: 5,
        name: "Babycino",
        price: 1.80,
        category: "drinks",

      },
      6: {
        id: 6,
        name: "Tiffin",
        price: 1.80,
        category: "cakes",

      }, 
      7: {
        id: 7,
        name: "Rocky Road",
        price: 1.80,
        category: "cakes",

      },
      8: {
        id: 8,
        name: "Millionnaire's shortbread",
        price: 1.80,
        category: "cakes",

      },
      9: {
        id: 9,
        name: "Chocolate Brownie",
        price: 1.80,
        category: "cakes",

      },
      10: {
        id: 10,
        name: "Apple and almond cake",
        price: 2.50,
        category: "cakes",

      }, 
      11: {
        id: 11,
        name: "Breakfast wrap",
        price: 4.50,
        category: "breakfast",

      },
      12: {
        id: 12,
        name: "Eggs on toast",
        price: 3.50,
        category: "breakfast",

      },
      13: {
        id: 13,
        name: "Pancake stack",
        price: 4.50,
        category: "breakfast",

      },                     
      14: {
        id: 14,
        name: "Sausage sammidge",
        price: 3.50,
        category: "breakfast",

      },
      15: {
        id: 15,
        name: "Porridge",
        price: 3.50,
        category: "breakfast",

      }             
    },
    orders : {},
  };


// resources - functions ///

// returns array of values from object
function getMenu(){
    return Object.values(storage.menu) 
}

function addOrder(order){
  
  const currentOrders = Object.keys(storage.orders);
  let orderId = currentOrders.length ? Math.max(...currentOrders) + 1: 1;

  storage.orders = Object.assign({}, storage.orders, { [orderId]: {
    orderid: orderId,
    menuitems: order
  }});

  return storage.orders[orderId]

}

function getOrders() {
  return storage.orders;
}

// function amendOrders(orderId, orderStatus) {
//   return storage.orders.status
// }


module.exports = {getMenu, addOrder, getOrders}