
orderList = [
  {
    id: 1,
    name: "Strawberry cheesecake",
    price: 6
  },
  {
    id: 2,
    name: "Chocolate cake",
    price: 5
  },
  {
    id: 3,
    name: "Cream cake",
    price: 4
  },
  {
    id: 4,
    name: "Angel cake",
    price: 3
  }
]


function showOrder() {


  const orderFunctions = {

    // #4
    createNewOrder(order) {
      const newOrder = {
        id: orderList.length+1,
        foodItem: order
      }

      orderList.push(newOrder);
      return newOrder;
    },

    // #5 Works
    getOrder() {
      return orderList;
    }


  }
  return orderFunctions;
}

module.exports = showOrder;


// #6
// changeOrderItem(id) {
//   const foodItem = orderList.find( item => item.id === parseInt(id));
//   if (!foodItem) {
//     return null;
//   }
//   else {
//     // foodItem.name = id.name;
//     orderList.push(foodItem);
//     return foodItem;
//   }
// },

// #7
// deleteFoodItem(id) {
//   const foodItem = orderList.find( item => item.id === parseInt(req.params.id));
//   if (!orderList) {
//     return null;
//   }
//   else {
//     const index = orderList.indexOf(foodItem);
//     orderList.splice(index, 1);
//     res.send(foodItem);
//   }
// },

// #8
//   deleteOrder() {
//     if (!orderList) {
//       return false;
//     }
//     else {
//       delete orderList;
//       return "Your order was deleted";
//   }
// }
