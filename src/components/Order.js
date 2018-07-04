import React from "react";

function Order({ order, handleClick, handleClose }) {
  return (
    <div className="order__display">
      <h3 className="order__title">Great choice, dude!</h3>
      <ul>
        {Object.keys(order).map(id => {
          {
            if (id == "total") return;
          }
          return (
            <li className="li__menu">
              <p>
                {order[id].name} :<br />£ {order[id].ownTotal.toFixed(2)}
              </p>
            </li>
          );
        })}
        <p>
          Total: £
          {order.total}{" "}
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
