function orderTotals(newOrder, menu) {
    const itemsCost = Object.values(newOrder).reduce((acc,item) => acc + (menu[item.id].price * item.quantity),0)
    return {
        itemsCost: itemsCost,
        deliveryCost: itemsCost > 30? 0:5,
        discount: itemsCost > 50? itemsCost/10:0
      }
}

module.exports = {
    orderTotals
}