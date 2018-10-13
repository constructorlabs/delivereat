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
    this.receiveQuanitityIncrease = this.receiveQuanitityIncrease.bind(this);
    this.receiveQuanitityDecrease = this.receiveQuanitityDecrease.bind(this);
    this.updateTotalPrice = this.updateTotalPrice.bind(this);
    this.checkCurrentOrder = this.checkCurrentOrder.bind(this);
    this.formatToMoney = this.formatToMoney.bind(this);
    this.state = {
      menuObject: {
        burgers: [],
        fries: [],
        extras: []
      },
      currentOrder: { orderItems: [], orderTotal: 0 },
      previousOrders: []
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
          menuObject: {
            burgers: Object.values(body.burgers),
            fries: Object.values(body.fries),
            extras: Object.values(body.extras)
          }
        })
      );
  }

  formatToMoney(number){
    return number.toLocaleString("en-GB", {style: "currency", currency: "GBP"})
  }

  updateTotalPrice(orderList) {
    let orderPriceArray = [];
    orderList.map(order => {
      orderPriceArray.push(order.price * order.quantity);
    });
    return orderPriceArray.reduce((acc, total) => acc + total);
  }

  receiveOrder(order) {
    if (this.state.currentOrder.orderItems.includes(order) === false) {
      const incomingOrder = this.state.currentOrder.orderItems.concat(order);
      const totalPrice = this.updateTotalPrice(incomingOrder);
      this.setState({
        currentOrder: {
          orderItems: incomingOrder,
          orderTotal: totalPrice
        }
      }, () => console.log(this.state.currentOrder));
    } else if (this.state.currentOrder.orderItems.includes(order) === true) {
      this.receiveQuanitityIncrease(order.id);
    }
  }

  receiveSubmitOrder() {
    fetch("/api/order", {
      method: "post",
      body: JSON.stringify(this.state.currentOrder),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(body =>
        this.setState({
          previousOrders: this.state.previousOrders.concat(body),
          currentOrder: { orderItems: [], orderTotal: 0 }
        })
      );
  }

  checkCurrentOrder(id) {
    const ordersToBeUpdated = this.state.currentOrder.orderItems;
    return ordersToBeUpdated.findIndex(item => item.id === id);
  }

  receiveQuanitityIncrease(id) {
    const orderIndex = this.checkCurrentOrder(id);
    const ordersToBeUpdated = this.state.currentOrder.orderItems;
    ordersToBeUpdated[orderIndex].quantity =
      ordersToBeUpdated[orderIndex].quantity + 1;
    const total = this.updateTotalPrice(ordersToBeUpdated);
    this.setState({
      currentOrder: { orderItems: ordersToBeUpdated, orderTotal: total }
    });
  }

  receiveQuanitityDecrease(id) {
    const orderIndex = this.checkCurrentOrder(id);
    const ordersToBeUpdated = this.state.currentOrder.orderItems;
    ordersToBeUpdated[orderIndex].quantity =
      ordersToBeUpdated[orderIndex].quantity - 1;
    const total = this.updateTotalPrice(ordersToBeUpdated);
    if (ordersToBeUpdated[orderIndex].quantity === 0) {
      ordersToBeUpdated.splice(ordersToBeUpdated[orderIndex], 1);
      this.setState({
        currentOrder: { orderItems: ordersToBeUpdated, orderTotal: total }
      });
    } else {
      this.setState({
        currentOrder: { orderItems: ordersToBeUpdated, orderTotal: total }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Menu
          menuObject={this.state.menuObject}
          receiveOrder={this.receiveOrder}
          formatToMoney={this.formatToMoney}
          currentOrder={this.state.currentOrder}
        />
        <Order
          currentOrder={this.state.currentOrder}
          receiveSubmitOrder={this.receiveSubmitOrder}
          receiveQuanitityIncrease={this.receiveQuanitityIncrease}
          receiveQuanitityDecrease={this.receiveQuanitityDecrease}
          formatToMoney={this.formatToMoney}
        />
      </div>
    );
  }
}

export default App;
