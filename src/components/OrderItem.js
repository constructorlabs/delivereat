import React from "react";

import "../styles/App.scss";

function OrderItem(orderItem, menuItem) {
      return (
        <li className="order__item">
          <strong>{orderItem.quantity} X {menuItem.name}</strong>
        </li>
      )
    }  

export default OrderItem;