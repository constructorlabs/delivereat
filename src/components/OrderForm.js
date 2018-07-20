import React from "react";
import OrderFormItem from "./OrderFormItem";

class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { subtotal: "", total: "" };

    this.deleteFormItem = this.deleteFormItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
  }

  componentDidMount() {
    const { orders } = this.props;
    let prices = Array.from(orders).map(el => el.price);
    let totalPrice = prices.reduce(function(acc, item) {
      return acc + item;
    }, 0);
    let priceWithDelivery = totalPrice + 2.95;
    this.setState({
      subtotal: [...this.state.total, totalPrice],
      total: priceWithDelivery
    });
  }

  deleteFormItem(key) {
    this.props.handleDelete(key);
  }

  sendOrder() {
    fetch("/api/order", {
      method: "post",
      body: JSON.stringify(this.props.orders),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.ok ? response.json() : Promise.reject(response);
      })
      .catch(error => console.log(error));
  }

  handleSubmit(event) {
    this.sendOrder();
    this.props.clearOrder();
  }

  render() {
    const { orders } = this.props;
    let prices = Array.from(orders).map(el => el.price);
    let totalPrice = prices.reduce(function(acc, item) {
      return acc + item;
    }, 0);
    let priceWithDelivery = totalPrice + 2.95;

    return (
      <div className="form">
        <h2>Order</h2>
        {Object.keys(this.props.orders).map(item => {
          return (
            <OrderFormItem
              order={this.props.orders[item]}
              key={this.props.orders[item].orderId}
              deleteFormItem={this.deleteFormItem}
            />
          );
        })}
        <h6 className="orderform__deliverycharge"> Subtotal: £{totalPrice}</h6>
        <p className="orderform__deliverycharge">Delivery charge: £2.95</p>
        <div className="orderform__total">
          <p>Total: £{priceWithDelivery}</p>
          <button
            className="orderform__button"
            onClick={this.handleSubmit}
            type="submit"
          >
            Submit Order
          </button>
        </div>
      </div>
    );
  }
}

export default OrderForm;
