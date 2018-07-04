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
  }

  componentDidMount() {
    fetch(`/order`)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          previousOrders: data
        });
      });
  }

  handleDelete(number) {
    const self = this;
    fetch("http://localhost:8080/deleteOrder", {
      method: "delete",
      body: JSON.stringify({ toDelete: number }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        fetch(`/order`)
          .then(function(response) {
            return response.json();
          })
          .then(data => {
            self.setState({
              previousOrders: data
            });
          });
      });
  }

  handleReorder(reorder) {
    const self = this;

    fetch("http://localhost:8080/makeOrder", {
      method: "post",
      body: JSON.stringify(reorder),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        fetch(`/order`)
          .then(function(response) {
            return response.json();
          })
          .then(data => {
            self.setState({
              previousOrders: data
            });
          });
      });
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/menu"
            render={() => <Menu previousOrders={this.state.previousOrders} />}
          />
          <Route
            path="/old-orders"
            render={() => (
              <OldOrders
                previousOrders={this.state.previousOrders}
                // handleDelete={this.handleDelete}
                // handleReorder={this.handleReorder}
              />
            )}
          />
        </Switch>
      </main>
    );
  }
}

export default Main;
