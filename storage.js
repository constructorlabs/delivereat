/// resources - nouns ///
const storage = {
    menu : {
      1: {
        id: 1,
        name: "Strawberry cheesecake",
        price: 6,
        category: "pudding",
        image: "#"
      },
      2: {
        id: 2,
        name: "Chocolate cheesecake",
        price: 5,
        category: "pudding",
        image: "#"
      }, 
      3: {
        id: 3,
        name: "Petit four",
        price: 3,
        category: "starter",
        image: "#"
      }, 
      4: {
        id: 4,
        name: "Chocaladehadle",
        price: 10,
        category: "main",
        image: "#"
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