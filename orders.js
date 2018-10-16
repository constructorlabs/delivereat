const orders = {};

function postOrder(order) {
  const newId = (Object.keys(orders).length) ? Math.max(...Object.keys(orders)) + 1 : 1;
  const date = new Date();
  const orderData = {'orderId': newId, 'orderStatus': 'new', 'placedAt': date.toLocaleString(), 'orderContents': order};
  orders[newId] = orderData;
  return orderData;
}

function patchOrder(orderId, newStatus) {
  orders[orderId].orderStatus = newStatus.orderStatus;
  return orders[orderId];
}

function getOpenOrders() {
  let openOrders = {};
  for (orderId in orders) {
    if (orders[orderId].orderStatus === 'new') {
      openOrders = Object.assign(openOrders, {[orderId]: orders[orderId]});
    }
  }
  return openOrders;
}

module.exports = {postOrder, patchOrder, getOpenOrders};