import React from "react";
import Menu from "./Menu";
import Header from "./Header";
import Footer from "./Footer";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menuItems: {},
      currentOrder: {},
      quantity: 0
    };

    this.receiveNewQuantity = this.receiveNewQuantity.bind(this);
    this.receiveWipeOrder = this.receiveWipeOrder.bind(this);
  }

  componentDidMount() {
    fetch(`/menu`)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          menuItems: data
        });
      });
  }

  receiveWipeOrder() {
    this.setState({
      currentOrder: {}
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
    return (
      <div className="app">
        <Header />
        <Menu
          receiveNewQuantity={this.receiveNewQuantity}
          receiveWipeOrder={this.receiveWipeOrder}
          menuItems={Object.values(this.state.menuItems)}
          currentOrder={this.state.currentOrder}
          basketMenuItems={this.state.menuItems}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
