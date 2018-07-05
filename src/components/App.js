import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
<<<<<<< HEAD
import BasketWidget from './basket/BasketWidget';
import Menu from './menu/Menu';
import Basket from './basket/Basket';
import OldOrders from './orders/OldOrders';
=======
import Basket from './Basket';
import Menu from './Menu/Menu';
import Orders from './Orders/Orders';
import OldOrders from './Orders/OldOrders';
import Search from './Search';
>>>>>>> 3d6587c540fd9b74707fc66cda39c2960d598af1
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
<<<<<<< HEAD
      deliveryPrice: 2.50,
      orderSent: false
    }
    this.ordersHandler = this.ordersHandler.bind(this);
    this.oldOrdersHandler = this.oldOrdersHandler.bind(this);
    this.checkOrderSentHandler = this.checkOrderSentHandler.bind(this);
    this.receiverDeletedOrder = this.receiverDeletedOrder.bind(this);
    this.receiverAddOrder = this.receiverAddOrder.bind(this);
=======
      section: "Menu",
      oldOrders: {}
    }
    this.ordersHandler = this.ordersHandler.bind(this);
    this.sectionHandler = this.sectionHandler.bind(this);
    this.oldOrdersHandler = this.oldOrdersHandler.bind(this);
>>>>>>> 3d6587c540fd9b74707fc66cda39c2960d598af1
  }

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

  oldOrdersHandler() {
    fetch('/api/orders?delivered=false')
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({
          oldOrders: data
        });
        return data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  receiverDeletedOrder(updatedOldOrders) {
    this.setState({
      oldOrders: updatedOldOrders
    })
  }

<<<<<<< HEAD
  receiverAddOrder(updatedOldOrders) {
    this.setState({
      oldOrders: updatedOldOrders
    })
  }

  checkOrderSentHandler() {
    this.setState({
      orderSent: true,
      currentOrders: {},
      orderAmount: 0,
      basket: 0
    })
  }

  render() {
    return (
      <div className="app-wrapper">
        <Header title="Delivereat" />
        <BasketWidget
          basketCount={this.state.basket}
          orderAmount={this.state.orderAmount}
          menu={this.state.menu} />
        <Switch>
          <Route exact path="/" render={() => <Menu
            receiver={this.ordersHandler}
            menu={this.state.menu}
            orders={this.state.currentOrders} />}
          />
          <Route exact path="/menu" render={() => <Menu
            receiver={this.ordersHandler}
            menu={this.state.menu}
            orders={this.state.currentOrders} />}
          />
          <Route exact path="/basket" render={() => <Basket
            orderAmount={this.state.orderAmount}
            receiver={this.ordersHandler}
            currentOrders={this.state.currentOrders}
            oldOrders={this.oldOrdersHandler}
            menu={this.state.menu}
            deliveryPrice={this.state.deliveryPrice}
            orderSent={this.state.orderSent}
            orderSentReceiver={this.checkOrderSentHandler} />}
          />
          <Route exact path="/old-orders" render={() => <OldOrders
            oldOrders={this.state.oldOrders}
            menu={this.state.menu}
            receiverDeletedOrder={this.receiverDeletedOrder}
            receiverAddOrder={this.receiverAddOrder} />}
          />
        </Switch>
=======
  oldOrdersHandler() {
    fetch('/api/getorders')
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.setState({
          oldOrders: data
        });
        // console.log("Old ords", data)
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log("Orders state: ", this.state.orders);
    const section = this.state.section;
    let currentSection;
    let basket;
    if (section === "Menu") {
      currentSection = <Menu receiver={this.ordersHandler} />;
      basket = <Basket receiver={this.sectionHandler} basketCount={this.state.basket} orderAmount={this.state.orderAmount} />;
    } else if (section === "Orders") {
      currentSection = <Orders orderAmount={this.state.orderAmount} receiver={this.ordersHandler} receiverOrder={this.sectionHandler} orders={this.state.orders} oldOrders={this.oldOrdersHandler} />;
      basket = null;
    } else if (section === "OldOrders") {
      currentSection = <OldOrders orders={this.state.orders} oldOrders={this.state.oldOrders} receiverOrder={this.sectionHandler} receiver={this.oldOrdersHandler} />;
      basket = null;
    }

    return (
      <div className="app-wrapper">
        <Header title="Delivereat" />
        <Search />
        {basket}
        {currentSection}
>>>>>>> 3d6587c540fd9b74707fc66cda39c2960d598af1
        <Footer />
      </div>
    )
  };
}

export default App;