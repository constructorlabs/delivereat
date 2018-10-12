import React from 'react';
import Menu from './Menu';
import Order from './Order';

import '../styles/app.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: [],
      isOrdering: false,
      currentOrderItem: {}
    };

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  // React code is running in the browser

  // create a fetch to a relative path eg. fetch("/api/menu") not "localhost:8080/api/menu" to the internal api from the endpoints defined in server.js  eg /menu  /order  etc

  componentDidMount() {
    fetch('/api/menu')
      .then(response => response.json())
      .then(body => {
        const menuItems = Object.values(body);
        this.setState({
          menu: menuItems
        });
      });
  }

  handleMenuItemClick(name, price) {
    this.setState({
      isOrdering: true,
      currentOrderItem: {
        itemName: name,
        itemPrice: price
      }
    });
  }

  render() {
    if (this.state.menu.starters) {
      console.log(this.state.menu.starters.name);
    }

    return (
      <div>
        <h1>Peng Munch</h1>
        <Menu
          menu={this.state.menu}
          handleMenuItemClick={this.handleMenuItemClick}
        />
        {this.state.isOrdering && (
          <Order currentOrderItem={this.state.currentOrderItem} />
        )}
      </div>
    );
  }
}

export default App;
