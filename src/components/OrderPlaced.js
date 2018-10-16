import React from "react";
import "../styles/components/checkout.scss";

class OrderPlaced extends React.Component {
  constructor() {
    super();

    this.state = {
      orderId: {},
      order: {},
      subTotal: 0,
      deliveryFee: 0,
      total: 0
    };
  }

  componentDidMount() {
    fetch(`api/orders/${this.props.orderId}`)
      .then(response => response.json())
      .then(result =>
        this.setState({
          orderId: result.orderId,
          order: result.dishes,
          subTotal: result.subTotal,
          deliveryFee: result.deliveryFee,
          total: result.total
        })
      )
      .catch(error => console.error("Error: ", error));
  }

  render() {
    if (this.state.order === null) {
      return <div>Loading...</div>;
    }

    return (
      <div className="checkout">
        <h3 className="checkout-title">Order Placed!</h3>
        {Object.values(this.state.order).map(orderItem => (
          <div className="checkout-item" key={`order${orderItem.dishId}`}>
            <p className="checkout-item__name">
              {orderItem.quantity} x {orderItem.name}
            </p>
            <p className="checkout-item__price">
              £{orderItem.subTotal !== null ? orderItem.subTotal.toFixed(2) : 0}
            </p>
          </div>
        ))}
        <hr />
        <div className="checkout__total">
          <h4>Total</h4>
          <p>£{this.state.total !== null ? this.state.total.toFixed(2) : 0}</p>
        </div>
      </div>
    );
  }
}

export default OrderPlaced;
