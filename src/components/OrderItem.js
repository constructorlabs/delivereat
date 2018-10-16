import React from "react";

function OrderItem({
  order,
  receiveQuanitityIncrease,
  receiveQuanitityDecrease,
  formatToMoney
}) {
  return (
    <div className="order__item">
      <p className="order__item__title">{order.name}</p>
      <p className="order__item__price">
        {formatToMoney(order.price * order.quantity)}
      </p>
      <div className="order__quantity__container">
      <button
        onClick={() => receiveQuanitityDecrease(order.id)}
        className="order__item__decrease"
      >
        -
      </button>
      <p className="order__item__quantity">{order.quantity}</p>
      <button
        onClick={() => receiveQuanitityIncrease(order.id)}
        className="order__item__increase"
      >
        +
      </button>
      </div>
    </div>
  );
}
export default OrderItem;
