import React from 'react';
import Menu from './Menu';
import Order from './Order';

import '../styles/app.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: [],
      activeIndex: 0,
      isOrdering: false,
      currentOrderItem: {},
      hasBasket: false,
      orderBasket: {}
    };

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.addOrderToBasket = this.addOrderToBasket.bind(this);
    this.closeOrder = this.closeOrder.bind(this);
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

  handleMenuItemClick(name, price, id) {
    this.setState({
      isOrdering: true,
      activeIndex: id,
      currentOrderItem: {
        itemName: name,
        itemPrice: price
      }
    });
  }

  addOrderToBasket(name, quantity, price) {
    console.log(`${quantity} ${name} added to basket for £${price * quantity}`);
    let newOrderBasket = {};
    const order = { name, quantity, price };
    if (this.state.orderBasket.hasOwnProperty(this.state.activeIndex)) {
      console.log(this.state.orderBasket[this.state.activeIndex]);
      const updatedOrder = (this.state.orderBasket[
        this.state.activeIndex
      ].quantity +=
        order.quantity);
      newOrderBasket = Object.assign({}, this.state.orderBasket, updatedOrder);
    } else {
      newOrderBasket = Object.assign({}, this.state.orderBasket, {
        [this.state.activeIndex]: order
      });
    }
    this.setState({
      hasBasket: true,
      orderBasket: newOrderBasket
    });
  }

  closeOrder() {
    this.setState({
      isOrdering: false
    });
  }

  render() {
    const { menu, currentOrderItem, isOrdering, activeIndex } = this.state;

    if (menu.starters) {
      console.log(menu.starters.name);
    }

    return (
      <div>
        <h1>Peng Munch</h1>
        <Menu menu={menu} handleMenuItemClick={this.handleMenuItemClick} />
        {isOrdering && (
          <Order
            key={activeIndex}
            currentOrderItem={currentOrderItem}
            addOrderToBasket={this.addOrderToBasket}
            closeOrder={this.closeOrder}
          />
        )}
      </div>
    );
  }
}

export default App;
