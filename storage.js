const menu = {
  1: {
    id: 1,
    name: "Rainbow Cake",
    price: 6,
    photoUrl: "rainbow.jpg",
    description: "this is great food",
    vegetarian: false,
  },
  2: {
    id: 2,
    name: "Chocolate Fudge Cake",
    price: 7,
    photoUrl: "fudge.jpeg",
    description: "this is better food indeed",
    vegetarian: true,
  },
  3: {
    id: 3,
    name: "Battenberg",
    price: 6,
    photoUrl: "battenberg.jpeg",
    description: "this is great food",
    vegetarian: false,
  },
  4: {
    id: 4,
    name: "Red Velvet",
    price: 7,
    photoUrl: "redvelvet.jpeg",
    description: "this is better food indeed",
    vegetarian: false,
  },
  5: {
    id: 5,
    name: "Blueberry Cheesecake",
    price: 6,
    photoUrl: "blueberry.jpeg",
    description: "this is great food",
    vegetarian: true,
  },
  6: {
    id: 6,
    name: "Apple Pie",
    price: 7,
    photoUrl: "apple.jpeg",
    description: "this is better food indeed",
    vegetarian: true,
  },
  7: {
    id: 7,
    name: "Banana Bread",
    price: 3,
    photoUrl: "banana.jpeg",
    description: "this is great food",
    vegetarian: true,
  },
  8: {
    id: 8,
    name: "Chocolate Tart",
    price: 4,
    photoUrl: "tart.jpeg",
    description: "this is better food indeed",
    vegetarian: false,
  },
  9: {
    id: 9,
    name: "Strawberry cheesecake",
    price: 5,
    photoUrl: "strawberry.jpg",
    description: "this is great food",
    vegetarian: true,
  },
  10: {
    id: 10,
    name: "Sticky Toffee Pudding",
    price: 7,
    photoUrl: "toffee.jpeg",
    description: "this is better food indeed",
    vegetarian: true,
  },
};

const orders = {
  1: {
  }
};

function getMenu(){
    return Object.values(menu);
}

function getItem(itemId){
  return menu[itemId]
}

function postOrder(items){
  const allOrders = Object.keys(orders)
  const highestOrder = Math.max(...allOrders) || 0
  const newOrderNumber = highestOrder + 1

  const orderToSave = { id: newOrderNumber, items }
  orders[newOrderNumber] = orderToSave
  return orderToSave
}

function getOrders(){
  return Object.values(orders)
}

module.exports = {
  getMenu,
  getItem,
  postOrder,
  getOrders,
}
