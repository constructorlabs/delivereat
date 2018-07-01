import React from 'react';
import Header from './Header';
import Basket from './Basket';
import Menu from './Menu/Menu';
import Orders from './Orders/Orders';
import Search from './Search';
import Footer from './Footer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: {},
      basket: 0,
      orderAmount: 0,
      section: "Menu"
    }
    this.ordersHandler = this.ordersHandler.bind(this);
    this.sectionHandler = this.sectionHandler.bind(this);
  }

  // {
  //   "1": {
  //     "dishId": 1,
  //     "qty": 1,
  //     "price": 3
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

  sectionHandler(section) {
    this.setState({
      section: section
    });
  }

  render() {
    console.log("Orders state: ", this.state.orders);
    const section = this.state.section;
    let currentSection;
    if (section === "Menu") {
      currentSection = <Menu receiver={this.ordersHandler} />;
    } else if (section === "Orders") {
      currentSection = <Orders receiver={this.ordersHandler} receiverOrder={this.sectionHandler} orders={this.state.orders} />;
    } else {

    }
    return (
      <div className="app-wrapper">
        <Header title="Delivereat" />
        <Search />
        <Basket receiver={this.sectionHandler}
          basketCount={this.state.basket}
          orderAmount={this.state.orderAmount} />
        {currentSection}
        <Footer />
      </div>
    )
  };
}

export default App;
