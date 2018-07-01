import React from 'react';
import Header from './Header';
import Basket from './Basket';
import Search from './Search';
import Menu from './Menu';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: {},
      basket: 0,
      orderAmount: 0
    }
    this.ordersHandler = this.ordersHandler.bind(this);
  }

  // {
  //   "1": {
  //     "dishId": 1,
  //     "qty": "1"
  //   },
  //   "2": {
  //     "dishId": 3,
  //     "qty": "6"
  //   }
  // }

  ordersHandler(dishId, quantity, price, action) {
    // Find if dish is already in orders and get position
    const dishPosition = Object.keys(this.state.orders).find(order => {
      return this.state.orders[order].dishId === dishId;
    });

    // If dish is already in orders update it
    if (dishPosition) {
      let orders = Object.assign({}, this.state.orders);
      if (quantity < 1) {
        delete orders[dishPosition];
      } else {
        orders[dishPosition].qty = quantity;
        orders[dishPosition].price = price;
      }
      this.setState({
        orders: orders
      });
    }
    // If dish is not already in orders add it
    else {
      const orderId = Object.keys(this.state.orders).length > 0 ? parseInt(Object.keys(this.state.orders).pop()) + 1 : 1;
      const newOrder = {
        [orderId]: {
          "dishId": dishId,
          "qty": quantity,
          "price": price
        }
      };
      this.setState({
        orders: Object.assign({}, this.state.orders, newOrder)
      });
    }

    // Update basket count
    this.setState(currentState => (
      {
        basket: Object.keys(currentState.orders).reduce((acc, item) => {
          return acc + parseInt(currentState.orders[item].qty, 10);
        }, 0),
        orderAmount: (() => {
          return action === "decrease"
            ? currentState.orderAmount - price
            : currentState.orderAmount + price;
        })()
      }
    ));
  }

  render() {
    console.log("Orders state: ", this.state.orders);

    return (
      <div className="app-wrapper">
        <Header title="Delivereat" />
        <Search />
        <Basket basketCount={this.state.basket} orderAmount={this.state.orderAmount} />
        <Menu receiver={this.ordersHandler} />
      </div>
    )
  };
}

export default App;
