import React from "react";
import Menu from "./Menu";
import Header from "./Header";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menuItems: {},
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
        // console.log(data);
        this.setState({
          menuItems: data
        });
        // console.log(this.state);
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
        <Header />
        <Menu
          receiveNewQuantity={this.receiveNewQuantity}
          menuItems={Object.values(this.state.menuItems)}
          currentOrder={this.state.currentOrder}
          basketMenuItems={this.state.menuItems}
        />
      </div>
    );
  }
}

export default App;
