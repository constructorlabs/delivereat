import React from "react";
import Header from "./Header";
import ConfirmationMessage from "./ConfirmationMessage";
import ConfirmationOrder from "./ConfirmationOrder";
import Login from "./Login";
import Menu from "./Menu";
import Order from "./Order";

import { orderTotals } from "../../common/orderTotals";
import "../styles/App.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: {},
      userId: 1,
      customer: {},
      orderHistory: {},
      newOrder: {},
      whichScreen: "ordering",
      orderConfirmation: {},
      loginInput: "",
      registerForm: {}
    };

    this.fetchMenu = this.fetchMenu.bind(this);
    this.receiverAddToOrder = this.receiverAddToOrder.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
    this.calculateTotals = this.calculateTotals.bind(this);
    this.login = this.login.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleChangeRegister = this.handleChangeRegister.bind(this);
    this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
  }

  componentWillMount() {
    this.fetchMenu();
    this.login("phil@berryman.org.uk");
  }

  fetchMenu() {
    fetch("/api/menu")
      .then(response => response.json())
      .then(body => {
        this.setState({
          menu: body
        });
      });
  }

  login(email) {
    console.log(email);
    return fetch(`/api/login/${email}`)
      .then(response => response.json())
      .then(body => {
        return body;
      });
  }

  sendOrder() {
    const orderObject = {
      items: this.state.newOrder,
      userId: this.state.customer.id
    };
    console.log(orderObject);

    fetch("/api/order", {
      method: "post",
      body: JSON.stringify(orderObject),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("sendOrder response");
        console.log(data);
        this.setState({
          orderConfirmation: data,
          whichScreen: "confirmation"
        });
      });
  }

  receiverAddToOrder(item) {
    const order = Object.assign({}, this.state.newOrder);
    if (order[item.id]) {
      order[item.id] = {
        id: item.id,
        quantity: order[item.id].quantity + item.quantity
      };
    } else {
      order[item.id] = {
        id: item.id,
        quantity: item.quantity
      };
    }

    if (order[item.id].quantity < 1) {
      delete order[item.id];
    }

    this.setState(
      {
        newOrder: order
      },
      () => console.log(this.state.newOrder)
    );
  }

  handleClickLogout(event) {
    this.setState({
      customer: {}
    });
  }

  handleClickLogin(event) {
    this.setState({
      whichScreen: "login"
    });
  }

  handleChangeLogin(event) {
    this.setState(
      {
        loginInput: event.target.value
      },
      () => console.log(this.state.loginInput)
    );
  }

  handleChangeRegister(event) {
    // registerForm[event.target.id] = event.target.value;
    this.setState({
        registerForm: Object.assign({}, this.state.registerForm, {[event.target.id]:event.target.value})
    },()=>console.log(this.state.registerForm))
  }

  handleSubmitRegister(event) {
    event.preventDefault();

    fetch("/api/customer", {
      method: "post",
      body: JSON.stringify(this.state.registerForm),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.login(data.email).then(customer => {
          if (!!customer) {
            this.setState({
              customer: customer,
              whichScreen: "ordering",
              loginInput: ""
            });
          }
        });
      });
  }

  
  handleSubmitLogin(event) {
    event.preventDefault();
    this.login(this.state.loginInput).then(customer => {
      if (!!customer) {
        this.setState({
          customer: customer,
          whichScreen: "ordering",
          loginInput: ""
        });
      }
    });
  }

  calculateTotals() {
    return orderTotals(this.state.newOrder, this.state.menu);
  }

  render() {
    return (
      <div className="wrapper">
        <Header user={this.state.user} />

        {this.state.whichScreen === "ordering" && (
          <Menu
            menu={this.state.menu}
            receiverAddToOrder={this.receiverAddToOrder}
            newOrder={this.state.newOrder}
          />
        )}

        {this.state.whichScreen === "confirmation" && <ConfirmationMessage />}

        {this.state.whichScreen === "confirmation" && (
          <ConfirmationOrder
            orderConfirmation={this.state.orderConfirmation}
            menu={this.state.menu}
            newOrder={this.state.newOrder}
          />
        )}

        {this.state.whichScreen === "ordering" && (
          <Order
            sendOrder={this.sendOrder}
            orderTotals={orderTotals(this.state.newOrder, this.state.menu)}
            newOrder={this.state.newOrder}
            menu={this.state.menu}
            customer={this.state.customer}
            handleClickLogout={this.handleClickLogout}
            handleClickLogin={this.handleClickLogin}
          />
        )}

        {this.state.whichScreen === "login" && (
          <Login
            handleChangeLogin={this.handleChangeLogin}
            handleSubmitLogin={this.handleSubmitLogin}
            handleChangeRegister={this.handleChangeRegister}
            handleSubmitRegister={this.handleSubmitRegister}
          />
        )}
      </div>
    );
  }
}

export default App;
