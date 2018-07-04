import React from "react";
import Menu from "./Menu";
import Nav from "./Nav";
import OrderForm from "./OrderForm";
import OrderHistory from "./OrderHistory";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: [],
      orders: {},
      orderhistory: ""
    };

    this.returnMenu = this.returnMenu.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clearOrder = this.clearOrder.bind(this);
    this.getOrderHistory = this.getOrderHistory.bind(this);
  }

  returnMenu(result) {
    const resultArr = Object.keys(result).map(function(item) {
      return result[item];
    });
    this.setState({
      menu: resultArr
    });
  }

  getOrder(order) {
    const matchingOrder = Array.from(this.state.orders).find(currentOrder => {
      return order.id === currentOrder.id;
    });

    if (matchingOrder) {
      matchingOrder.quantity += order.quantity;
      matchingOrder.price += order.price;

      const ordersWithoutCurrentOrder = this.state.orders.filter(
        currentOrder => {
          return currentOrder.id !== order.id;
        }
      );

      this.setState({
        orders: ordersWithoutCurrentOrder.concat(matchingOrder)
      });
    } else {
      this.setState({
        orders: [...this.state.orders, order]
      });
    }
  }

  handleDelete(key) {
    this.setState(prevState => ({
      orders: prevState.orders.filter(el => el.orderId != key)
    }));
  }

  clearOrder() {
    this.setState({
      orders: {}
    });
  }

  getOrderHistory(event) {
    event.preventDefault();
    fetch("/api/order", { method: "get" })
      .then(response => response.json())
      .then(result => {
        console.log("fetch order:", result);
        this.setState({
          orderhistory: result
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    console.log("set order hist:", this.state.orderhistory);
    return (
      <div className="app">
        <div className="header">
          <Nav />
        </div>
        <button
          className="orderform__history"
          onClick={this.getOrderHistory}
          type="submit"
        >
          View Order History
        </button>;
        <div className="main">
          {this.state.orderhistory === "" ? null : (
            <OrderHistory orderhistory={this.state.orderhistory} />
          )}
          {this.state.orders == {} ? null : (
            <OrderForm
              orders={this.state.orders}
              handleDelete={this.handleDelete}
              clearOrder={this.clearOrder}
              returnOrderHistory={this.returnOrderHistory}
            />
          )}
          <Menu
            returnMenu={this.returnMenu}
            menu={this.state.menu}
            getOrder={this.getOrder}
          />
        </div>
        <div className="footer">
          <p className="footer__credits">
            A website by Phoebe DG ~ powered by Constructor Labs
          </p>
        </div>
      </div>
    );
  }
}

export default App;
