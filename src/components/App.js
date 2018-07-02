import React from "react";
import Menu from "./Menu";
import Header from "./Header";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menuItems: [],
      currentOrder: {},
      quantity: 0
    };
    this.receiveNewQuantity = this.receiveNewQuantity.bind(this);
  }

  componentDidMount() {
    fetch(`/menu`)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          menuItems: Object.values(data)
        });
        console.log(this.state);
      });
  }

  receiveNewQuantity(id, quantity) {
    const currentOrder = Object.assign({}, this.state.currentOrder, {
      [id]: +quantity
    });

    this.setState({
      currentOrder
    });
  }

  render() {
    console.log(this.state.currentOrder);
    return (
      <div className="app">
        <Header
          menuItems={this.state.menuItems}
          currentOrder={this.state.currentOrder}
          quantity={this.state.quantity}
        />
        <Menu
          receiveNewQuantity={this.receiveNewQuantity}
          menuItems={this.state.menuItems}
          currentOrder={this.state.currentOrder}
        />
      </div>
    );
  }
}

export default App;
