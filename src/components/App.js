import React from 'react';
import Menu from './Menu';
import Order from './Order';
import Basket from './Basket';

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
      orderBasket: {},
      hasOrdered: false
    };

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.addOrderToBasket = this.addOrderToBasket.bind(this);
    this.closeOrder = this.closeOrder.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
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
    let newOrderBasket = {};
    const order = { id: this.state.activeIndex, name, quantity, price };
    if (this.state.orderBasket.hasOwnProperty(this.state.activeIndex)) {
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
      isOrdering: false,
      hasBasket: true,
      orderBasket: newOrderBasket
    });
  }

  closeOrder() {
    this.setState({
      isOrdering: false
    });
  }

  submitOrder() {
    fetch('/api/order', {
      method: 'post',
      body: JSON.stringify(this.state.orderBasket),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          hasBasket: false,
          hasOrdered: true
        });
        console.log(data);
      });
  }

  render() {
    const {
      menu,
      currentOrderItem,
      isOrdering,
      activeIndex,
      hasBasket,
      orderBasket,
      hasOrdered
    } = this.state;

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
        {hasBasket && (
          <Basket basket={orderBasket} submitOrder={this.submitOrder} />
        )}
        {hasOrdered && (
          <h3> Thank you for your order. Enjoy your breakfast!</h3>
        )}
      </div>
    );
  }
}

export default App;
