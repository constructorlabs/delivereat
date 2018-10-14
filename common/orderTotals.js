function orderTotals(newOrder, menu) {
    const itemsCost = Object.values(newOrder).reduce((acc,item) => acc + (menu[item.id].price * item.quantity),0)
    const deliveryCost = itemsCost > 30? 0:5
    console.log(deliveryCost + "ddddd");


    return {
        itemsCost: itemsCost,
        deliveryCost: deliveryCost,
        discount: itemsCost > 50? itemsCost/10:0,
        deliveryMessage: itemsCost === 0?'Free delivery on orders over £30':itemsCost<30?`Spend £${30 - itemsCost} more for free delivery`: 'Delivery is Free!'
          }
      }


module.exports = {
    orderTotals
}