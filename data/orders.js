let orders = {};

function addToOrders (newOrder) {
  const keys = Object.keys(orders);
  const orderId = keys.length ? Math.max(...keys) + 1 : 1;
  orders = Object.assign({}, orders, {[orderId]: newOrder});
}

function getOrders () {
  return orders;
}

exports.addToOrders = addToOrders;
exports.getOrders = getOrders;