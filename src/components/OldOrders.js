import React from "react";
import OlderOrdersItem from "./OldOrdersItem";

function OldOrders({ previousOrders, reorderReceiver, receiveReorderNew }) {
  function handleReorder(reorder) {
    fetch("/api/orders", {
      method: "post",
      body: JSON.stringify(reorder),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return fetch(`/api/orders`);
      })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        receiveReorderNew(data);
      });
  }

  function handleDelete(number) {
    fetch(`/api/orders/${number}`, {
      method: "delete"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return fetch(`/api/orders`);
      })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log(data);
        reorderReceiver(data);
      });
  }

  return (
    <div className="display__oldOrders">
      <h3 className="oldOrders__title">
        Previous <br />Orders
      </h3>

      {Object.keys(previousOrders).map(prevOrder => {
        return (
          <OlderOrdersItem
            key={prevOrder.id}
            number={prevOrder}
            prevOrder={prevOrder}
            previousOrders={previousOrders}
            handleDelete={handleDelete}
            handleReorder={handleReorder}
            reorderReceiver={reorderReceiver}
            receiveReorderNew={receiveReorderNew}
          />
        );
      })}

      <img
        className="orders__image"
        src="./static/images/bakery-order-logo.jpg"
      />
    </div>
  );
}

export default OldOrders;
