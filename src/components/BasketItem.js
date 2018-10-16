import React from "react";
import "../styles/components/basketItem.scss";

function BasketItem({ basketItem, decreaseQuantity, increaseQuantity }) {
  return (
    <div className="basketItem">
      <div className="quantity">
        <button
          className="quantity__decrease button-quantity"
          onClick={() => decreaseQuantity(basketItem.dishId)}
        >
          -
        </button>
        <p className="quantity__amount">{basketItem.quantity}</p>
        <button
          className="quantity__increase button-quantity"
          onClick={() => increaseQuantity(basketItem.dishId)}
        >
          +
        </button>
      </div>
      <p className="basketItem__name">{basketItem.name}</p>

      <p className="basketItem__price" />
    </div>
  );
}

export default BasketItem;
