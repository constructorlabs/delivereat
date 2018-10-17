import React from 'react';

function OrderCurrent ({currentOrder, menu, emptyBasket, getCurrency}) {
    let total = 0;
    const values = Object.values(currentOrder);
    if (values.length === 0) { 
        emptyBasket(); 
        return;
    }
    return <div>
    { values
      .filter(orderItem => typeof orderItem === "object")
      .map((orderItem) => {
        const menuItem = menu[orderItem.menuId];
        total += orderItem.quantity * menuItem.price;
        return (<div key={"current-order-" + orderItem.menuId} className="order_item">
        {orderItem.quantity} x {menuItem.name} = {getCurrency(orderItem.quantity * menuItem.price)}
          <div className="tooltip">
          <i className="fas fa-1x fa-image fa-icon-style"></i>
            <div className="tooltip-content">
              <img src={menuItem.image}></img>
            </div>
          </div>
        </div>)
      })}
       <hr className="box"></hr>
      <div>Date: {currentOrder.date}</div>
      <div>Total: {getCurrency(total)}</div>
      <button onClick={emptyBasket} type="button" className="basket__state-empty">Empty basket</button>
    </div>
  }

export default OrderCurrent;