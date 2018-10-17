import React from 'react';

function OrdersDisplayed ({filterInput, orders, menu, getCurrency, filterOrders}) {
  let total = 0;
  const input = filterInput || null;
  const values = Object.values(orders);
  
  return (
    <div className="orders">
      <h2>View all orders <i className="fas fa-1x fa-pound-sign"></i></h2>
      { values
      .filter(item => input ? item.order.username.includes(input) : true)
      .map((item, index) => {
      const summary = Object.values(item.order)
      .filter(orderItem => typeof orderItem === "object")
      .map(orderItem => {
        total += (orderItem.quantity * menu[orderItem.menuId].price);
        return <div key={"item-" + orderItem.menuId} className="order_item">
          {orderItem.quantity} x {menu[orderItem.menuId].name} = {getCurrency(orderItem.quantity * menu[orderItem.menuId].price)}
          <div className="tooltip"><i className="fas fa-1x fa-image fa-icon-style"></i>
            <div className="tooltip-content">
              <img src={menu[orderItem.menuId].image}></img>
            </div>
          </div>
        </div>
      });
      return (<div key={"order-" + index}>
        <div><strong>Order name: {item.order.username}</strong></div>
        {summary}
        <div>Date: {item.order.date}</div>
        <div key={"total-" + index + 1}>Total: {getCurrency(total)} + { total < 30 ? (getCurrency(3) + " delivery charge") : `free delivery` }</div>
        {index < values.length-1 && <hr className="box"></hr>}
      </div>)
    })
  }
  <div>
    <input type="text" onChange={filterOrders} className="orders__filter" placeholder="&#128269; Search orders..."></input>
  </div>
</div>)
}
export default OrdersDisplayed;