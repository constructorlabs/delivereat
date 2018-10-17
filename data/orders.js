let orders = {
  1: { 
    id: 1,
    order: { 
      '1': { menuId: 1, quantity: 2 },
      '2': { menuId: 2, quantity: 3 },
       date: '17-10-2018',
       username: 'Roland',
       telephone: '07901 972 811' 
    } 
  }
};

function addToOrders (newOrder) {
  const keys = Object.keys(orders);
  const orderId = keys.length ? Math.max(...keys) + 1 : 1;
  orders = Object.assign({}, orders, {[orderId]: {
    id: orderId,
    order: newOrder
  }});
  return orders[orderId];
}

function getOrders () {
  return orders;
}

exports.addToOrders = addToOrders;
exports.getOrders = getOrders;