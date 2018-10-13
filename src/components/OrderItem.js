import React from "react";

function OrderItem({ order, receiveQuanitityIncrease, receiveQuanitityDecrease }){
    return (
        <div className="order__item">
          <p className="order__item__title">{order.name}</p>
          <p className="order__item__price">
            {(order.price * order.quantity).toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP"
            })}
          </p>
          <button onClick={() => receiveQuanitityDecrease(order.id)} className="order__item__decrease">-</button>
          <p className="order__item__quantity">{order.quantity}</p>
          <button onClick={() => receiveQuanitityIncrease(order.id)} className="order__item__increase">+</button>
        </div>
      );
}
export default OrderItem;
