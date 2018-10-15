import React from "react";
import Dish from "./Dish";
import Modal from "./Modal";

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      orderTotal: 0,
      order: [],
      orderObject: [],
      displayModal: false,
      orderConfirmation: []
    };

    this.menuFetch = this.menuFetch.bind(this);
    this.recieveOrderTotal = this.recieveOrderTotal.bind(this);
    this.submitOrderHandle = this.submitOrderHandle.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  //fetches menu
  menuFetch() {
    fetch("/api/menu/")
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          menu: data
        });
      });
  }

  componentDidMount() {
    this.menuFetch();
  }

  //Recieves the order information from Dish and displays in basket. Also sets the 'orderObject' state.
  recieveOrderTotal(price, dishName, quantity, id) {
    this.state.order.push([
      `${quantity} x ${dishName} - £${price.toFixed(2)} `
    ]);
    this.state.orderObject.push(
      (id = {
        id: id,
        name: dishName,
        quantity: quantity,
        price: price
      })
    );
    this.setState({
      orderTotal: (this.state.orderTotal += price)
    });
  }

  //Sends the order to the server and recieves an order number
  submitOrderHandle(event) {
    if (this.state.orderObject.length !== 0) {
      console.log(this.state.orderObject.name);
      event.preventDefault();
      fetch("/api/order", {
        method: "post",
        body: JSON.stringify(this.state.orderObject),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(data => {
          console.log(data);

          this.setState({
            displayModal: !this.state.displayModal,
            orderObject: [],
            orderConfirmation: data
          });
        });
    } else {
      alert("Cannot submit an empty basket!");
    }
  }
  //Closes the confirmation modal
  closeModal() {
    this.setState({
      displayModal: !this.state.displayModal,
      order: [],
      orderTotal: 0
    });
  }

  render() {
    return (
      <div className="menu">
        {this.state.menu.map(dish => {
          return (
            <Dish
              currentOrder={this.state.orderObject}
              addPrice={this.recieveOrderTotal}
              dish={dish}
              key={dish.id}
            />
          );
        })}
        <Modal
          className="modal"
          display={this.state.displayModal}
          onClose={this.closeModal}
        >
          <div className="confirmation-order-complete">
            Congratulations! Your order is complete. <br />
          </div>
          <div className="confirmation-order-number">
            <br />
            Your order no. is:
            {this.state.orderConfirmation.id}
          </div>
          <div className="confirmation-order-list">
            {this.state.order.map(orderItem => {
              return <p>{orderItem}</p>;
            })}
          </div>
          <div className="confirmation-order-total">
            Total: £{this.state.orderTotal.toFixed(2)}
          </div>
        </Modal>
        Basket:
        <ul>
          {this.state.order.map(orderItem => {
            return <li>{orderItem}</li>;
          })}
        </ul>
        <p>Order price: £{this.state.orderTotal.toFixed(2)} </p>
        <p>Any requests?</p>
        <input
          className="request"
          type="text"
          placeholder="e.g. Call when outside"
        />
        <br />
        <button onClick={this.submitOrderHandle}>Complete Order</button>
      </div>
    );
  }
}

export default Menu;
