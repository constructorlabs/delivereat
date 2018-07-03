import React from "react";

class Basket extends React.Component {
  constructor() {
    super();
    this.state = {
      previousOrder: {}
    };
    this.handleClick = this.handleClick.bind(this);
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
      .then(() => fetch(`order`))
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          previousOrder: data
        });
      })
      .catch(error => console.log(error));
  }

  getBasket(total) {
    const deliveryCharge = total * 0.1;
    const orderTotal = total + deliveryCharge;
    return total > 0 ? (
      <div>
        <p>Food: £{total}</p>
        <p>Delivery: £{deliveryCharge}</p>
        <p>Total: £{orderTotal}</p>
        <button onClick={this.handleClick} className="app__basket--button">
          Order Now
        </button>
        <a onClick={this.fetchAllOrders}>
          <p className="app__basket--previous-orders">Previous Orders</p>
        </a>
      </div>
    ) : (
      <div />
    );
  }

  prevOrder() {
    const prevOrder = this.state.previousOrder;
    return previousOrder !== {} ? (
      <div className="previous-order">
        <ul>
          {prevOrder.map(order => {
            return <li key="order.id" />;
          })}
        </ul>
      </div>
    ) : (
      <div />
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
      <div className="app__basket">
        <img
          src="../../static/shopping-basket.png"
          className="app__basket--img"
        />
        {this.getBasket(total)}
      </div>
    );
  }
}
export default Basket;
