import React from "react";
import BasketItem from "./BasketItem.js";
import "../styles/components/basket.scss";

function Basket({ basket, dishes, decreaseQuantity, increaseQuantity }) {
  return (
    <div className="basket">
      {Object.values(basket).map(basketItem => (
        <BasketItem
          key={basketItem.id}
          basketItem={basketItem}
          dishes={dishes}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
        />
      ))}

      <hr />

      <div className="basket__subtotal">
        <h4>Subtotal</h4>
        <p>£20</p>
      </div>

      <div className="basket__delivery">
        <h4>Delivery Fee</h4>
        <p>£2.50</p>
      </div>

      <hr />

      <div className="basket__total">
        <h4>Total</h4>
        <p>£40</p>
      </div>

      <button className="basket__checkout-btn">Checkout</button>
    </div>
  );
}

export default Basket;
