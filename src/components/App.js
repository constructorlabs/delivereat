import React from "react";
import Menu from "./Menu";
import Order from "./Order";
import cx from "classnames";

import "../styles/components/app.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menuArr: [],
      order: {},
      totalFoodPrice : '',
      on: false,
      finalPrice: '',
      deliveryCharge: '',
      confirmation: ''
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.calculateFoodTotal = this.calculateFoodTotal.bind(this);
    this.calculateDeliveryCharge = this.calculateDeliveryCharge.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.calculateFinalPrice = this.calculateFinalPrice.bind(this)
  }

  componentDidMount() {
    fetch("api/menu")
      .then(response => response.json())
      .then(body => this.setState({ menuArr: body }));
  }

  addToOrder(item) {
    let orderItem;

    if (this.state.order[item.id]) {
      orderItem = Object.assign({}, this.state.order[item.id]);
      const itemsQuantity = orderItem.quantity + 1;
      const itemsPrice = (orderItem.price * itemsQuantity).toFixed(2);
      orderItem.quantity = itemsQuantity;
      orderItem.orderPrice = Number(itemsPrice);
    } else {
      orderItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        orderPrice: Number(item.price).toFixed(2)
      };
    }
    const newOrder = Object.assign({}, this.state.order);
    newOrder[item.id] = orderItem;
    this.setState(
      {
        order: newOrder
      },
      () => {console.log(this.state.order);
      this.calculateFoodTotal(this.state.order)}
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
      () => {console.log(this.state.order); this.calculateFoodTotal(this.state.total)}
    );
  }

  calculateFoodTotal(){
    let totalPrice = 0;
    let totalPriceArr = [];
    let orderCopy = Object.assign({}, this.state.order);
    Object.values(orderCopy).map(obj => totalPriceArr.push(Number(obj.orderPrice)));
    totalPrice = (totalPriceArr.reduce((a,b)=> a + b));
    totalPrice = Number(totalPrice).toFixed(2);
    this.setState({
      totalFoodPrice : Number(totalPrice).toFixed(2)
    }, () => this.calculateDeliveryCharge(this.state.totalFoodPrice))
  }

  calculateDeliveryCharge(){
    let deliveryCharge = 0
    this.state.totalFoodPrice > 25 ? deliveryCharge = 0 : deliveryCharge = 5;
    this.setState({
      deliveryCharge: Number(deliveryCharge).toFixed(2),
    }, () => this.calculateFinalPrice())
  }

  calculateFinalPrice(){
    let finalPrice = Number(this.state.totalFoodPrice) + Number(this.state.deliveryCharge);
    this.setState({
      finalPrice: Number(finalPrice).toFixed(2)
    }, ()=>console.log(this.state.finalPrice))
  }

  submitOrder(customer) {
    const finalOrder = Object.assign({}, this.state.order, customer);
    this.setState({
      order: {}
    })
    fetch("http://localhost:8080/api/order", {
      method: "post",
      body: JSON.stringify(finalOrder),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          totalFoodPrice : '',
          finalPrice: '',
          deliveryCharge: '',
          confirmation: `Thank you for your order. Your reference number is: ${data}`,

        }, () => this.displayModal(data))
      });
  }

  displayModal() {
    this.setState({
      on: !this.state.on
    });
  }

  closeModal() {
    this.setState(
      {
        confirmation: "",
        on: !this.state.on,
      });
  }

  render() {
    const classes = cx("modal", {
      "modal--active": this.state.on
    });

    return (
      <div className='wrapper'>
        <header>
          <img className='logo' src="../../../static/images/delivery.png" />
          <h1>deliverEATs</h1>
        </header>
        <main>
          <Menu
            menuArr={this.state.menuArr}
            addToOrder={this.addToOrder}
            removeFromOrder={this.removeFromOrder}
          />
        </main>
        <aside>
          <Order order={this.state.order} submitOrder={this.submitOrder} totalFoodPrice = {this.state.totalFoodPrice} finalPrice={this.state.finalPrice} deliveryCharge={this.state.deliveryCharge} />
        </aside>

        <div id="confirmationModal" className={classes}>
            <span onClick={this.closeModal} className='close'>
            <i className="fas fa-window-close"></i>
            </span>
            <p className='confirmation'>{this.state.confirmation}</p>
        </div>

      </div>
    );
  }
}

export default App;
