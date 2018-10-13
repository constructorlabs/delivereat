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
      orderBasket: {},
      hasOrdered: false,
      orderRef: 0
    };

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.addOrderToBasket = this.addOrderToBasket.bind(this);
    this.closeOrder = this.closeOrder.bind(this);
    this.handleBasketChange = this.handleBasketChange.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
  }

  // React code is running in the browser

  // create a fetch to a relative path eg. fetch("/api/menu") not "localhost:8080/api/menu" to the internal api from the endpoints defined in server.js  eg /menu  /order  etc

  componentDidMount() {
    fetch('/api/menu')
      .then(response => response.json())
      .then(body => {
        // const menuItems = Object.values(body);
        this.setState({
          menu: body
        });
      });
  }

  handleMenuItemClick(name, price, id) {
    fetch(`/api/menu/${id}`)
      .then(response => response.json())
      .then(body =>
        this.setState({
          hasOrdered: false,
          isOrdering: true,
          activeIndex: id,
          currentOrderItem: body
        })
      );
  }

  addOrderToBasket(name, quantity, price) {
    const { orderBasket, activeIndex } = this.state;
    let newOrderBasket = {};
    const order = { id: activeIndex, name, quantity, price };
    if (orderBasket.hasOwnProperty(activeIndex)) {
      const updatedOrder = (orderBasket[activeIndex].quantity +=
        order.quantity);
      newOrderBasket = Object.assign({}, orderBasket, updatedOrder);
    } else {
      newOrderBasket = Object.assign({}, orderBasket, {
        [activeIndex]: order
      });
    }
    this.setState({
      isOrdering: false,
      orderBasket: newOrderBasket
    });
  }

  closeOrder() {
    this.setState({
      isOrdering: false
    });
  }

  handleBasketChange(e, id) {
    const { orderBasket } = this.state;
    const orderToUpdate = orderBasket[id];
    let updatedOrder = {};

    switch (e.target.name) {
      case 'increase':
        updatedOrder = orderToUpdate.quantity++;
        break;
      case 'decrease':
        if (orderBasket[id].quantity > 1) {
          updatedOrder = orderToUpdate.quantity--;
        }
        break;
    }

    const updatedBasket = Object.assign({}, orderBasket, updatedOrder);
    this.setState({
      orderBasket: updatedBasket
    });
  }

  removeFromBasket(id) {
    const updatedBasket = this.state.orderBasket;
    delete updatedBasket[id];
    this.setState({
      orderBasket: updatedBasket
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
          orderBasket: {},
          hasOrdered: true,
          orderRef: Object.keys(data)[0]
        });
        console.log(this.state.orderRef);
      });
  }

  render() {
    const {
      menu,
      currentOrderItem,
      isOrdering,
      activeIndex,
      orderBasket,
      hasOrdered
    } = this.state;

    const hasBasket = Object.keys(orderBasket).length > 0;

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
          <Basket
            basket={orderBasket}
            submitOrder={this.submitOrder}
            handleBasketChange={this.handleBasketChange}
            removeFromBasket={this.removeFromBasket}
          />
        )}
        {hasOrdered && (
          <div>
            <h3> Thank you for your order. Enjoy your breakfast!</h3>
            <a href={`/orders/${this.state.orderRef}`}>Track your order</a>
          </div>
        )}
      </div>
    );
  }
}

export default App;
