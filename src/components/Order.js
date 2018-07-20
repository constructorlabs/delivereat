import React from "react";

function Order({ order, showOrder, handleClick, handleClose }) {
  return (
    <div className="order__display">
      <ul>
        {Object.keys(order).map(id => {
          {
            if (id == "total") return;
          }
          return (
            <li key={order.id} className="li__menu">
              <p>
                {order[id].name} :<br />£ {order[id].ownTotal.toFixed(2)}
              </p>
            </li>
          );
        })}
        <p>
          Total: £
          {order.total}
        </p>
        <p className="delivery__charge">*includes £2.40 delivery charge*</p>
        <button onClick={handleClick} className="submit__order-button">
          Submit Order
        </button>
        <button onClick={handleClose}> Close Window </button>
      </ul>
    </div>
  );
}

export default Order;
