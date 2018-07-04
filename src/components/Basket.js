import React from "react";

class Basket extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.getBasket = this.getBasket.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    fetch(`/order`, {
      method: "post",
      body: JSON.stringify(this.props.currentOrder),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .catch(error => console.log(error));
  }

  getBasket(total) {
    const deliveryCharge = total * 0.1;
    const fixedDeliveryCharge = deliveryCharge.toFixed(2);
    const orderTotal = total + deliveryCharge;
    const newOrderIds = Object.keys(this.props.currentOrder);
    const orderedItems = newOrderIds.map(orderId => {
      return (
        <li key={orderId} className="display__basket--listItem">
          {this.props.basketMenuItems[orderId].name}
        </li>
      );
    });
    return total > 0 ? (
      <div>
        <ul className="basketItem--list">{orderedItems}</ul>
        {/* {return orderTotal < 10 ? (
        <div>
          <p>Subtotal £{total}</p>
          <p>minimum order has to be £10</p>
          <p>Delivery Fee £{fixedDeliveryCharge}</p>
          <p>Total £{orderTotal}</p>
          <button
            onClick={this.handleClick}
            className="app__basket--button"
            disabled
          >
            Order Now
          </button>
        </div>
        ) : ( */}
        {/* <div> */}
        <p>Subtotal £{total}</p>
        <p>Delivery Fee £{fixedDeliveryCharge}</p>
        <p>Total £{orderTotal}</p>
        <button onClick={this.handleClick} className="display__basket--button">
          Order Now
        </button>
        {/* </div> */}
        {/* )}; */}
      </div>
    ) : (
      <div>
        <p>Your basket is empty</p>
      </div>
    );
  }

  render() {
    const orderIds = Object.keys(this.props.currentOrder);
    const total = orderIds.reduce((acc, orderId) => {
      return (acc +=
        this.props.currentOrder[orderId] *
        this.props.basketMenuItems[orderId].price);
    }, 0);
    return (
      <div className="display__basket">
        <div className="display__basket--box">
          <img
            src="../../static/shopping-basket.png"
            className="display__basket--icon"
          />
          <hr />
          {this.getBasket(total)}
        </div>
      </div>
    );
  }
}
export default Basket;
