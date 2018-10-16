import React from "react";
import OrderMenu from "./OrderMenu";
import Order from "./Order";
import MenuPage from "./MenuPage";
import Navigation from "./Navigation";
import Header from "./Header";
import cx from "classnames";

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
    this.receivePageChange = this.receivePageChange.bind(this);
    this.state = {
      menuObject: {
        burgers: [],
        fries: [],
        extras: []
      },
      currentOrder: { orderItems: [], orderTotal: 0 },
      previousOrders: [],
      currentPage: "menu"
    };
  }

  receivePageChange(id) {
    if (id === "menu") {
      this.setState({
        currentPage: "menu"
      });
    } else if (id === "order") {
      this.setState({
        currentPage: "order"
      });
    }
  }

  componentDidMount() {
    this.fetchMenu();
    this.setState({
      currentOrder: 
      localStorage.getItem("currentOrder") === null
            ? { orderItems: [], orderTotal: 0 }
            : JSON.parse(localStorage.getItem("currentOrder"))
    })
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

  formatToMoney(number) {
    return number.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP"
    });
  }

  updateTotalPrice(orderList) {
    let orderPriceArray = [];
    orderList.map(order => {
      orderPriceArray.push(order.price * order.quantity);
    });
    return orderPriceArray.reduce((acc, total) => acc + total);
  }

  receiveOrder(order) {
    order.quantity = 1;
    if (this.state.currentOrder.orderItems.includes(order) === false) {
      const incomingOrder = this.state.currentOrder.orderItems.concat(order);
      const totalPrice = this.updateTotalPrice(incomingOrder);
      this.setState(
        {
          currentOrder: {
            orderItems: incomingOrder,
            orderTotal: totalPrice
          }
        },
        () => localStorage.setItem("currentOrder", JSON.stringify(this.state.currentOrder))
      );
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
        }, () => localStorage.clear() )
      );
  }

  checkCurrentOrder(id) {
    const ordersToBeUpdated = this.state.currentOrder.orderItems;
    return ordersToBeUpdated.findIndex(item => item.id === id);
  }

  receiveQuanitityIncrease(id) {
    const orderIndex = this.checkCurrentOrder(id);
    const ordersToBeUpdated = [...this.state.currentOrder.orderItems];
    ordersToBeUpdated[orderIndex].quantity =
      ordersToBeUpdated[orderIndex].quantity + 1;
    const total = this.updateTotalPrice(ordersToBeUpdated);
    this.setState({
      currentOrder: { orderItems: ordersToBeUpdated, orderTotal: total }
    }, () => localStorage.setItem("currentOrder", JSON.stringify(this.state.currentOrder)))
  }

  receiveQuanitityDecrease(id) {
    const orderIndex = this.checkCurrentOrder(id);
    const ordersToBeUpdated = [...this.state.currentOrder.orderItems];
    console.log('first', ordersToBeUpdated);
    ordersToBeUpdated[orderIndex].quantity =
      ordersToBeUpdated[orderIndex].quantity - 1;
    console.log('second', ordersToBeUpdated);
    const total = this.updateTotalPrice(ordersToBeUpdated);
    if (ordersToBeUpdated[orderIndex].quantity < 1) {
      ordersToBeUpdated.splice(ordersToBeUpdated[orderIndex], 1);
    }
    this.setState({
      currentOrder: { orderItems: ordersToBeUpdated, orderTotal: total }
      }, () => localStorage.setItem("currentOrder", JSON.stringify(this.state.currentOrder)));
  } 
  

  render() {
    const menuClasses = cx("menu__page__container", {
      "menu__page__container--visible": this.state.currentPage === "menu",
      "menu__page__container--notVisible": this.state.currentPage === "order"
    });

    const orderMenuClasses = cx("order__menu__container", {
      "order__menu__container--visible": this.state.currentPage === "order",
      "order__menu__container--notVisible": this.state.currentPage === "menu"
    });

    const orderClasses = cx("order__container", {
      "order__container--visible": this.state.currentPage === "order",
      "order__container--notVisible": this.state.currentPage === "menu"
    });

    return (
      <div className="App">
        <Header />
        <Navigation receivePageChange={this.receivePageChange} />
        <MenuPage
          menuClasses={menuClasses}
          menuObject={this.state.menuObject}
          formatToMoney={this.formatToMoney}
        />
        <OrderMenu
          menuObject={this.state.menuObject}
          receiveOrder={this.receiveOrder}
          formatToMoney={this.formatToMoney}
          currentOrder={this.state.currentOrder}
          orderMenuClasses={orderMenuClasses}
        />
        <Order
          currentOrder={this.state.currentOrder}
          receiveSubmitOrder={this.receiveSubmitOrder}
          receiveQuanitityIncrease={this.receiveQuanitityIncrease}
          receiveQuanitityDecrease={this.receiveQuanitityDecrease}
          formatToMoney={this.formatToMoney}
          orderClasses={orderClasses}
        />
      </div>
    );
  }
}

export default App;
