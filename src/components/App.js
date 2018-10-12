import React from "react";
import Menu from "./Menu";
import Order from "./Order";

import "../styles/App.scss";

class App extends React.Component {
  constructor() {
    super();
    this.fetchMenu = this.fetchMenu.bind(this);
    this.receiveOrder = this.receiveOrder.bind(this);
    this.receiveSubmitOrder = this.receiveSubmitOrder.bind(this);
    this.state = {
      menuArray: [],
      currentOrder: { orderItems: [], orderTotal: 0 }
    };
  }

  componentDidMount() {
    this.fetchMenu();
  }

  fetchMenu() {
    fetch("/api/menu")
      .then(response => response.json())
      .then(body =>
        this.setState({
          menuArray: Object.values(body)
        })
      );
  }

  receiveOrder(order) {
    const incomingOrder = this.state.currentOrder.orderItems.concat(order);

    let orderPriceArray = [];
    incomingOrder.map(order => {
      orderPriceArray.push(order.price);
    });
    const totalPrice = orderPriceArray.reduce((acc, total) => acc + total);

    this.setState(
      {
        currentOrder: {
          orderItems: incomingOrder,
          orderTotal: totalPrice
        }
      },
      () => console.log(this.state.currentOrder)
    );
  }

  receiveSubmitOrder() {
    fetch('/api/order', {
      method: 'post',
      body: JSON.stringify(currentOrder),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(body => console.log(body))
  }

  render() {
    return (
      <div>
        <Menu
          menuArray={this.state.menuArray}
          receiveOrder={this.receiveOrder}
        />
        <Order
          currentOrder={this.state.currentOrder}
          receiveSubmitOrder={this.receiveSubmitOrder}
        />
      </div>
    );
  }
}

export default App;
