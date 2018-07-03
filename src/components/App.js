import React from 'react';
import Header from './Header';
import BasketWidget from './basket/BasketWidget';
import Menu from './menu/Menu';
import Basket from './basket/Basket';
import OldOrders from './orders/OldOrders';
import Search from './Search';
import Footer from './Footer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentOrders: {},
      oldOrders: {},
      menu: {},
      basket: 0,
      orderAmount: 0,
      section: "Menu",
      deliveryPrice: 2.50
    }
    this.ordersHandler = this.ordersHandler.bind(this);
    this.sectionHandler = this.sectionHandler.bind(this);
    this.oldOrdersHandler = this.oldOrdersHandler.bind(this);
  }

  // {
  //   "1": {
  //     "dishId": 1,
  //     "qty": 1,
  //     "price": 3
  //   }
  // }
  componentDidMount() {
    fetch('/api/menu')
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.setState({
          menu: result
        })
        return result;
      })
      .catch(error => {
        console.log(error);
      });
  }
  ordersHandler(dishId, quantity, price, action) {
    // Find if dish is already in orders and get position
    const dishPosition = Object.keys(this.state.currentOrders).find(order => {
      return this.state.currentOrders[order].dishId === dishId;
    });

    // If dish is already in orders update it
    if (dishPosition) {
      let currentOrders = Object.assign({}, this.state.currentOrders);
      if (quantity < 1) {
        delete currentOrders[dishPosition];
      } else {
        currentOrders[dishPosition].qty = quantity;
        currentOrders[dishPosition].unitPrice = price;
        currentOrders[dishPosition].price = price * quantity;
      }
      this.setState({
        currentOrders: currentOrders
      });
    }
    // If dish is not already in orders add it
    else {
      const orderId = Object.keys(this.state.currentOrders).length > 0
        ? parseInt(Object.keys(this.state.currentOrders).pop()) + 1
        : 1;

      const newOrder = {
        [orderId]: {
          "dishId": dishId,
          "qty": quantity,
          "unitPrice": price,
          "price": price * quantity
        }
      };
      this.setState({
        currentOrders: Object.assign({}, this.state.currentOrders, newOrder)
      });
    }

    // Update basket count
    this.setState(currentState => (
      {
        basket: Object.keys(currentState.currentOrders).reduce((acc, item) => {
          return acc + parseInt(currentState.currentOrders[item].qty, 10);
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

  oldOrdersHandler() {
    fetch('/api/orders')
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({
          oldOrders: data
        });
        return data;
        // console.log("Old ords", data)
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // console.log("Orders state: ", this.state.orders);

    const section = this.state.section;
    let currentSection;
    let basket;

    if (section === "Menu") {
      currentSection = <Menu
        receiver={this.ordersHandler}
        menu={this.state.menu}
        orders={this.state.currentOrders}
      />;
      basket = <BasketWidget
        receiver={this.sectionHandler}
        basketCount={this.state.basket}
        orderAmount={this.state.orderAmount}
        menu={this.state.menu}
      />;
    } else if (section === "Orders") {
      currentSection = <Basket
        orderAmount={this.state.orderAmount}
        receiver={this.ordersHandler}
        receiverOrder={this.sectionHandler}
        orders={this.state.currentOrders}
        oldOrders={this.oldOrdersHandler}
        menu={this.state.menu}
        deliveryPrice={this.state.deliveryPrice}
      />;
      basket = null;
    } else if (section === "OldOrders") {
      currentSection = <OldOrders
        oldOrders={this.state.oldOrders}
        menu={this.state.menu}
        receiverOrder={this.sectionHandler}
        receiver={this.oldOrdersHandler}
      />;
      basket = null;
    }

    return (
      <div className="app-wrapper">
        <Header title="Delivereat" />
        <Search />
        {basket}
        {currentSection}
        <Footer />
      </div>
    )
  };
}

export default App;
