import React from "react";
import OrderPlaced from "./orderPlaced.js";
import "../styles/components/checkout.scss";
import "../styles/components/basket.scss";

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      order: {}
    };

    // this.placeOrder = this.placeOrder.bind(this);
    // this.checkout = this.checkout.bind(this);
  }

  getTotals() {
    let subTotal = 0;
    const deliveryFee = 2.5;

    Object.keys(this.props.basket).map(dishId => {
      subTotal +=
        this.props.dishes[dishId].price * this.props.basket[dishId].quantity;
    });

    return {
      subTotal: subTotal.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      total: (subTotal + deliveryFee).toFixed(2)
    };
  }

  render() {
    if (this.props.orderPlaced) {
      return <OrderPlaced orderId={this.props.orderId} />;
    }

    return (
      <div className="checkout">
        <h3 className="checkout-title">Your Order</h3>

        {Object.values(this.props.basket).map(basketItem => (
          <div className="checkout-item" key={basketItem.dishId}>
            <p className="checkout-item__name">
              {basketItem.quantity} x {basketItem.name}
            </p>
            <p className="checkout-item__price">
              £
              {(
                this.props.dishes[basketItem.dishId].price * basketItem.quantity
              ).toFixed(2)}
            </p>
          </div>
        ))}

        <hr />

        <div className="checkout__subtotal">
          <p>Subtotal</p>
          <p>£{this.getTotals().subTotal}</p>
        </div>

        <div className="checkout__delivery">
          <p>Delivery Fee</p>
          <p>£{this.getTotals().deliveryFee}</p>
        </div>

        <hr />

        <div className="checkout__total">
          <h4>Total</h4>
          <p>£{this.getTotals().total}</p>
        </div>

        <button
          className="checkout__checkout-btn button"
          onClick={() => this.props.placeOrder()}
        >
          Place Order
        </button>
      </div>
    );
  }
}

export default Checkout;
