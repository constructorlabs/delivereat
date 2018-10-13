import React from "react";
import OrderItem from "./OrderItem";

function Order({ currentOrder, receiveSubmitOrder, receiveQuanitityIncrease, receiveQuanitityDecrease }) {

    function formatToMoney(number){
        return number.toLocaleString("en-GB", {style: "currency", currency: "GBP"})
    }

    let deliveryCharge = (currentOrder.orderTotal > 20) ? 0 : 2
  return (
    <div className="order__container">
      <h3 className="order__title">Order:</h3>
      {currentOrder.orderItems.map(order => (
        <OrderItem
          key={Math.random() * Math.random() * 10}
          receiveQuanitityIncrease={receiveQuanitityIncrease}
          receiveQuanitityDecrease={receiveQuanitityDecrease}
          order={order}
        />
      ))}
      <p className="order__total">
        Order Total: {formatToMoney(currentOrder.orderTotal)}<br/>
        Delivery Charge: {formatToMoney(deliveryCharge)}<br/>
        Total:{formatToMoney((currentOrder.orderTotal + deliveryCharge))}
      </p>
      <button className="order__receive__button" onClick={receiveSubmitOrder}>
        Submit Order
      </button>
    </div>
  );
}

export default Order;
