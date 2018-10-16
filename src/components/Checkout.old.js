import React from "react";
import "../styles/components/checkout.scss"


function Checkout({ basket, dishes, placeOrder }) {
  let subTotal = 0;

  Object.keys(basket).map(dishId => {
    subTotal += dishes[dishId].price * basket[dishId].quantity;
  });

  let deliveryFee = 2.5;

  let total = subTotal + deliveryFee;

  return (
    <div className="checkout">
    <h3 className ="checkout-title">Your Order</h3>
      {Object.values(basket).map(basketItem => (
        <div className = "checkout-item" key={basketItem.dishId}>
          <p className="checkout-item__name">{basketItem.quantity} x {basketItem.name}</p>
          <p className="checkout-item__price">
            £
            {(dishes[basketItem.dishId].price * basketItem.quantity).toFixed(2)}
          </p>
        </div>
      ))}

      <hr />

      <div className="checkout__subtotal">
        <h4>Subtotal</h4>
        <p>£{subTotal.toFixed(2)}</p>
      </div>

      <div className="checkout__delivery">
        <h4>Delivery Fee</h4>
        <p>£{deliveryFee.toFixed(2)}</p>
      </div>

      <hr />

      <div className="checkout__total">
        <h4>Total</h4>
        <p>£{total.toFixed(2)}</p>
      </div>

      <button className="checkout__checkout-btn" onClick={() => placeOrder()}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
