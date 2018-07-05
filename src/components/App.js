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
      orderhistory: {},
      closed: true
    };

    this.returnMenu = this.returnMenu.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clearOrder = this.clearOrder.bind(this);
    this.getOrderHistory = this.getOrderHistory.bind(this);
    this.handleClearHistory = this.handleClearHistory.bind(this);
    this.closeWasClicked = this.closeWasClicked.bind(this);
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
    const things = Array.from(this.state.orders);
    const matchingOrder = things.find(currentOrder => {
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
        if (Object.keys(result).length === 0) {
          alert("Please place an order to view order");
        } else {
          this.setState({
            orderhistory: result,
            closed: false
          });
        }
      })
      .catch(error => console.log(error));
  }

  handleClearHistory(key) {
    // const tempOrderHistory = [...this.state.orderhistory];
    // delete tempOrderHistory[key];
    // this.setState({
    //   orderhistory: tempOrderHistory
    // });

    fetch(`/api/order/${key}`, { method: "delete" })
      .then(response => response.json())
      .then(result => {
        console.log("delete result:", result);
        this.setState({
          orderhistory: result
        });
      })
      .catch(error => console.log(error));
  }

  closeWasClicked() {
    this.setState({
      closed: true
    });
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
          {Object.keys(this.state.orderhistory).length === 0 ||
          this.state.closed === true ? null : (
            <OrderHistory
              orderhistory={this.state.orderhistory}
              handleClearHistory={this.handleClearHistory}
              closeWasClicked={this.closeWasClicked}
            />
          )}
          {Object.keys(this.state.orders).length === 0 ? null : (
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
