import React from "react";
import "../styles/components/basketItem.scss";

function BasketItem({
  basketItem,
  dishes,
  decreaseQuantity,
  increaseQuantity
}) {
  
  return (
    <div className="basketItem">
      <button
        className="basketItem__decrease-btn"
        onClick={event => decreaseQuantity(event, basketItem.id)}
      >
        -
      </button>
      <p className="basketItem__quantity">{basketItem.quantity}</p>
      <button
        className="basketItem__increase-btn"
        onClick={event => increaseQuantity(event, basketItem.id)}
      >
        +
      </button>

      <p className="basketItem__name">{basketItem.name}</p>

      <p className="basketItem__price">
        £{(dishes[basketItem.id].price * basketItem.quantity).toFixed(2)}
      </p>
    </div>
  );
}

export default BasketItem;
