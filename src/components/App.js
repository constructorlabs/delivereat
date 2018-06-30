import React from "react";
import Menu from "./Menu";
import Nav from "./Nav";
import OrderForm from "./OrderForm";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: [],
      orders: []
    };

    this.returnMenu = this.returnMenu.bind(this);
    this.getOrder = this.getOrder.bind(this);
  }

  returnMenu(result) {
    const resultArr = Object.keys(result).map(function(item) {
      return result[item];
    });
    this.setState({
      menu: resultArr
    });
    console.log("this.state.menu", this.state.menu);
  }

  getOrder(order) {
    console.log("Order:", order);
    this.setState({
      orders: [...this.state.orders, order]
    });
  }

  render() {
    console.log("this.state.orders:", this.state.orders);
    return (
      <div className="app">
        <div className="header">
          <Nav />
        </div>
        <div className="main">
          <OrderForm orders={this.state.orders} />
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
