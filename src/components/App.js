import React from "react";

import "../styles/App.scss";
import Menu from "./Menu";
import Order from "./Order";
import OrderHistory from "./OrderHistory";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHome } from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingCart, faHome);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      order: [],
      placedOrders: [],
      orderBasket: [],
      displayMenu: true,
      displayOrderHistory: false
    };

    this.receiveAddClick = this.receiveAddClick.bind(this);
    this.receiveRemoveClick = this.receiveRemoveClick.bind(this);
    this.receiveClickPlus = this.receiveClickPlus.bind(this);
    this.receiveClickMinus = this.receiveClickMinus.bind(this);
    this.receiveOrderSubmit = this.receiveOrderSubmit.bind(this);
    this.shoppingCart = this.shoppingCart.bind(this);
    this.orderHistory = this.orderHistory.bind(this);
  }

  componentDidMount() {
    fetch("/api/menu")
      .then(response => response.json())
      .then(body => {
        const menu = Object.values(body);

        this.setState({
          menu: menu
        });
      });

    const storageString = window.localStorage.getItem("placedOrders");
    const storage = !storageString ? [] : JSON.parse(storageString);
    const orderString = window.localStorage.getItem("order");
    const orderStorage = !orderString ? [] : JSON.parse(orderString);
    this.setState({
      placedOrders: storage,
      order: orderStorage
    });
  }

  receiveOrderSubmit() {
    fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },

      body: JSON.stringify(this.state.order)
    })
      .then(response => response.json())
      .then(body => {
        this.setState({
          order: [],
          displayMenu: true
        });
        alert("Order has been placed successfully!");
      });

    fetch("/api/order")
      .then(response => response.json())
      .then(body => {
        this.setState(
          {
            placedOrders: body
          },
          () =>
            localStorage.setItem(
              "placedOrders",
              JSON.stringify(this.state.placedOrders)
            )
        );
      });
  }

  receiveAddClick(name) {
    this.setState(
      {
        order: this.state.order.concat({
          name: name,
          number: 1,
          price: this.state.menu.find(item => item.name == name).price
        })
      },
      () => localStorage.setItem("order", JSON.stringify(this.state.order))
    );
  }

  receiveRemoveClick(name) {
    this.setState(
      {
        order: this.state.order.filter(item => item.name !== name)
      },
      () => localStorage.setItem("order", JSON.stringify(this.state.order))
    );
  }
  receiveClickPlus(orderName) {
    this.setState(
      {
        order: this.state.order.map(item => {
          if (item.name == orderName) {
            return (item = {
              name: item.name,
              number: item.number + 1,
              price: item.price
            });
          } else {
            return item;
          }
        })
      },
      () => console.log(this.state.order)
    );
  }
  receiveClickMinus(orderName) {
    this.setState(
      {
        order: this.state.order
          .map(item => {
            if (item.name == orderName && item.number > 0) {
              return (item = {
                name: item.name,
                number: item.number - 1,
                price: item.price
              });
            } else {
              return item;
            }
          })
          .filter(item => item.number !== 0)
      },
      () => console.log(this.state.order)
    );
  }

  shoppingCart() {
    this.setState({
      displayMenu: !this.state.displayMenu
    });
  }

  orderHistory() {
    this.setState({
      displayOrderHistory: !this.state.displayOrderHistory
    });
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Food Heaven</h1>
        <div className="nav">
          <p className="orderHistory" onClick={this.orderHistory}>
            Order History
          </p>
          {this.state.displayOrderHistory ? (
            <OrderHistory placedOrders={this.state.placedOrders} />
          ) : null}
          {this.state.displayMenu ? (
            <FontAwesomeIcon
              className="icon"
              icon="shopping-cart"
              onClick={this.shoppingCart}
            />
          ) : (
            <FontAwesomeIcon
              className="icon"
              icon="home"
              onClick={this.shoppingCart}
            />
          )}
        </div>
        {this.state.displayMenu ? (
          <div>
            <Menu
              receiveAddClick={this.receiveAddClick}
              menu={this.state.menu}
              order={this.state.order}
              receiveClickPlus={this.receiveClickPlus}
              receiveClickMinus={this.receiveClickMinus}
              receiveOrderSubmit={this.receiveOrderSubmit}
              receiveRemoveClick={this.receiveRemoveClick}
            />
          </div>
        ) : (
          <div>
            <Order
              order={this.state.order}
              receiveClickPlus={this.receiveClickPlus}
              receiveClickMinus={this.receiveClickMinus}
              receiveOrderSubmit={this.receiveOrderSubmit}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
