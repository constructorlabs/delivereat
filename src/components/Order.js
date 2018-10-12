import React from "react";
import OrderItem from "./OrderItem";

function Order({ currentOrder, receiveSubmitOrder }) {



  return (
    <div>
      <h3>Order:</h3>
      {currentOrder.orderItems.map(order => (
        <OrderItem order={order} />
      ))}
      <p>
        Total:{" "}
        {currentOrder.orderTotal.toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP"
        })}{" "}
      </p>
      <button>Submit Order</button>
    </div>
  );
}

export default Order;
