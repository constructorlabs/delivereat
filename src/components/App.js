import React from "react";
import Menu from "./Menu";
import Order from "./Order";
import Login from "./Login";
import cx from "classnames";

import "../styles/components/app.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menuArr: [],
      order: {},
      totalFoodPrice: "",
      on: false,
      finalPrice: "",
      deliveryCharge: "",
      confirmation: "",
      changeScreen: "ordering",
      customerID: ""
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.calculateFoodTotal = this.calculateFoodTotal.bind(this);
    this.calculateDeliveryCharge = this.calculateDeliveryCharge.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.calculateFinalPrice = this.calculateFinalPrice.bind(this);
    this.anotherScreen = this.anotherScreen.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
  }

  componentDidMount() {
    fetch("api/menu")
      .then(response => response.json())
      .then(body => {
        this.setState({ menuArr: Object.values(body) });
      });
  }

  addToOrder(item) {
    let orderItem;
    if (this.state.order[item.id]) {
      orderItem = Object.assign({}, this.state.order[item.id]);
      const itemsQuantity = orderItem.quantity + 1;
      const itemsPrice = parseFloat(orderItem.price) * itemsQuantity;
      orderItem.quantity = itemsQuantity;
      orderItem.orderPrice = parseFloat(itemsPrice).toFixed(2);
    } else {
      orderItem = {
        id: item.id,
        name: item.item_name,
        price: parseFloat(item.item_price),
        quantity: 1,
        orderPrice: Number(item.item_price).toFixed(2)
      };
    }
    const newOrder = Object.assign({}, this.state.order);
    newOrder[item.id] = orderItem;
    this.setState(
      {
        order: newOrder
      },
      () => this.calculateFoodTotal(this.state.order)
    );
  }

  removeFromOrder(item) {
    let orderItem;
    const newOrder = Object.assign({}, this.state.order);

    if (this.state.order[item.id]) {
      orderItem = Object.assign({}, this.state.order[item.id]);
      const itemsQuantity = orderItem.quantity - 1;
      if (itemsQuantity === 0) {
        delete newOrder[item.id];
      } else {
        const itemsPrice = (orderItem.price * itemsQuantity).toFixed(2);
        orderItem.quantity = itemsQuantity;
        orderItem.orderPrice = itemsPrice;
        newOrder[item.id] = orderItem;
      }
    }
    this.setState(
      {
        order: newOrder
      },
      () => this.calculateFoodTotal(this.state.total)
    );
  }

  calculateFoodTotal() {
    let totalPrice = 0;
    let totalPriceArr = [];
    let orderCopy = Object.assign({}, this.state.order);
    Object.values(orderCopy).map(obj =>
      totalPriceArr.push(Number(obj.orderPrice))
    );
    totalPrice = totalPriceArr.reduce((a, b) => a + b);
    totalPrice = Number(totalPrice).toFixed(2);
    this.setState(
      {
        totalFoodPrice: Number(totalPrice).toFixed(2)
      },
      () => this.calculateDeliveryCharge(this.state.totalFoodPrice)
    );
  }

  calculateDeliveryCharge() {
    let deliveryCharge = 0;
    this.state.totalFoodPrice > 25
      ? (deliveryCharge = 0)
      : (deliveryCharge = 5);
    this.setState(
      {
        deliveryCharge: Number(deliveryCharge).toFixed(2)
      },
      () => this.calculateFinalPrice()
    );
  }

  calculateFinalPrice() {
    let finalPrice =
      Number(this.state.totalFoodPrice) + Number(this.state.deliveryCharge);
    this.setState({
      finalPrice: Number(finalPrice).toFixed(2)
    });
  }

  anotherScreen() {
    this.setState({
      changeScreen: "login"
    });
  }

  addCustomer(customer) {
    // const user = [
    //   { username: customer.email },
    //   { user_password: customer.password },
    //   { name: customer.name },
    //   { address: customer.address },
    //   { mobile: customer.mobile }
    // ];
    // console.log(user);
    const user = { customer: customer };
    fetch("http://localhost:8080/api/customer", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState(
          {
            customerID: data.id,
            mobile: data.mobile
          },
          () => {console.log(this.state.customerID, this.state.mobile); 
            this.submitOrder(this.state.customerID, this.state.mobile)
          })
        });
  }

  submitOrder(customerID, mobile) {
    let finalOrder = [];
    Object.values(this.state.order).map(value =>
      finalOrder.push({ menuItemId: value.id, quantity: value.quantity })
    );
    const items = { finalOrder: finalOrder, customerID: customerID, mobile: mobile };
    this.setState({
      order: {}
    });

    fetch("http://localhost:8080/api/order", {
      method: "post",
      body: JSON.stringify(items),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState(
          {
            totalFoodPrice: "",
            finalPrice: "",
            deliveryCharge: "",
            confirmation: `Thank you for your order. Your reference number is: ${
              data.orderId
            }`
          },
          () => {
            this.displayModal(data);
          }
        );
      });
  }

  displayModal() {
    this.setState({
      on: !this.state.on
    });
  }

  closeModal() {
    this.setState({
      confirmation: "",
      on: !this.state.on
    });
  }

  render() {
    const classes = cx("modal", {
      "modal--active": this.state.on
    });

    return (
      <div className="wrapper">
        <header>
          <img className="logo" src="../../../static/images/delivery.png" />
          <h1>deliverEATs</h1>
        </header>
        {this.state.changeScreen === "ordering" && (
          <React.Fragment>
            <main>
              <Menu
                menuArr={this.state.menuArr}
                addToOrder={this.addToOrder}
                removeFromOrder={this.removeFromOrder}
              />
            </main>
            <aside>
              <Order
                order={this.state.order}
                anotherScreen={this.anotherScreen}
                totalFoodPrice={this.state.totalFoodPrice}
                finalPrice={this.state.finalPrice}
                deliveryCharge={this.state.deliveryCharge}
              />
            </aside>
          </React.Fragment>
        )}
        {this.state.changeScreen === "login" && (
          <Login
            submitOrder={this.submitOrder}
            addCustomer={this.addCustomer}
          />
        )}
        <div id="confirmationModal" className={classes}>
          <span onClick={this.closeModal} className="close">
            &times;
          </span>
          <p className="confirmation">{this.state.confirmation}</p>
        </div>
      </div>
    );
  }
}

export default App;
