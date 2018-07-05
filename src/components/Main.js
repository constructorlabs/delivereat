import React from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import HomePage from "./HomePage";
import OldOrders from "./OldOrders";

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      previousOrders: {}
    };

    this.reorderReceiver = this.reorderReceiver.bind(this);
    this.receiveUpdateOrder = this.receiveUpdateOrder.bind(this);
    this.receiveReorderNew = this.receiveReorderNew.bind(this);
  }

  componentDidMount() {
    fetch(`/api/orders`)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          previousOrders: data
        });
      });
  }

  reorderReceiver(data) {
    this.setState({
      previousOrders: data
    });
  }

  receiveUpdateOrder(data) {
    this.setState({
      previousOrders: data
    });
  }

  receiveReorderNew(data) {
    this.setState({
      previousOrders: data
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/menu"
          render={() => (
            <Menu
              previousOrders={this.state.previousOrders}
              receiveUpdateOrder={this.receiveUpdateOrder}
              toggleLogo={this.props.toggleLogo}
            />
          )}
        />
        <Route
          path="/old-orders"
          render={() => (
            <OldOrders
              previousOrders={this.state.previousOrders}
              reorderReceiver={this.reorderReceiver}
              receiveReorderNew={this.receiveReorderNew}
            />
          )}
        />
      </Switch>
    );
  }
}

export default Main;
