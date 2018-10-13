import React from "react";
import BasketItem from "./BasketItem.js";
import "../styles/components/basket.scss";

function Basket({
  basket,
  dishes,
  decreaseQuantity,
  increaseQuantity,
  checkout
}) {
  let subTotal = 0;

  Object.keys(basket).map(dishId => {
    subTotal += dishes[dishId].price * basket[dishId].quantity;
  });

  let deliveryFee = 2.5;

  let total = subTotal + deliveryFee;

  return (
    <div className="basket">
      {Object.values(basket).map(basketItem => (
        <BasketItem
          key={basketItem.dishId}
          basketItem={basketItem}
          dishes={dishes}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
        />
      ))}

      <hr />

      <div className="basket__subtotal">
        <h4>Subtotal</h4>
        <p>£{subTotal.toFixed(2)}</p>
      </div>

      <div className="basket__delivery">
        <h4>Delivery Fee</h4>
        <p>£{deliveryFee.toFixed(2)}</p>
      </div>

      <hr />

      <div className="basket__total">
        <h4>Total</h4>
        <p>£{total.toFixed(2)}</p>
      </div>

      <button
        className="basket__checkout-btn"
        onClick={() => checkout()}
      >
        Checkout
      </button>
    </div>
  );
}

export default Basket;
