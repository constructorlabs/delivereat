import React from "react";
import Menu from "./Menu";
import Nav from "./Nav";
import OrderForm from "./OrderForm";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: [],
      orders: [],
      orderhistory: []
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
    // console.log("Order:", order);
    this.setState({
      orders: [...this.state.orders, order]
    });
  }

  handleDelete(key) {
    // console.log("Item deleted");
    this.setState(prevState => ({
      orders: prevState.orders.filter(el => el.orderId != key)
    }));
  }

  clearOrder() {
    this.setState({
      orders: []
    });
  }

  getOrderHistory(data) {
    this.setState({
      orderhistory: data
    });
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          <Nav />
        </div>
        <div className="main">
          {this.state.orders == ![] ? null : (
            <OrderForm
              orders={this.state.orders}
              handleDelete={this.handleDelete}
              clearOrder={this.clearOrder}
              getOrderHistory={this.getOrderHistory}
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
