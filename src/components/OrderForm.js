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
    let prices = orders.map(el => el.price);
    let totalPrice = prices.reduce(function(acc, item) {
      return acc + item;
    }, 0);
    let priceWithDelivery = totalPrice + 2.95;
    this.setState({
      subtotal: [...this.state.total, totalPrice],
      total: priceWithDelivery
    });
  }

  componentDidUpdate(prevProps) {
    const { orders } = this.props;
    if (orders !== prevProps.orders) {
      let prices = orders.map(el => el.price);
      console.log("prices:", prices);
      let totalPrice = prices.reduce(function(acc, item) {
        return acc + item;
      }, 0);
      let priceWithDelivery = totalPrice + 2.95;
      console.log("totalPrice:", totalPrice);
      this.setState({
        subtotal: totalPrice,
        total: priceWithDelivery
      });
    }
  }

  deleteFormItem(key) {
    this.props.handleDelete(key);
  }

  sendOrder() {
    fetch("http://localhost:8080/api/order", {
      method: "post",
      body: JSON.stringify(this.props.orders),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        this.props.getOrderHistory(data);
      });
    console.log("Sending order");
  }

  handleSubmit(event) {
    this.sendOrder();
    this.props.clearOrder();
  }

  render() {
    console.log("this.state.total:", this.state.total);
    return (
      <div className="orderform">
        <h2>Order</h2>
        {this.props.orders.map(item => {
          return (
            <OrderFormItem
              order={item}
              key={item.orderId}
              deleteFormItem={this.deleteFormItem}
            />
          );
        })}
        <h6 className="orderform__deliverycharge">
          {" "}
          Subtotal: £{this.state.subtotal}
        </h6>
        <p className="orderform__deliverycharge">Delivery charge: £2.95</p>
        <div className="orderform__total">
          <p>Total: £{this.state.total}</p>
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
