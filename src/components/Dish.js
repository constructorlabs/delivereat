import React from "react";
import cx from "classnames";
import Nutrition from "./Nutrition";
class Dish extends React.Component {
  constructor() {
    super();
    this.state = {
      highlight: false,
      quantity: 0
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
  }
  // Sets quantity in state
  addQuantity(event) {
    this.state.quantity = event.target.value;
  }

  //Passes the order info up to Menu
  addToOrder(event) {
    event.preventDefault;
    if (this.state.quantity !== 0) {
      console.log(this.props.dish.price);
      let itemPrice = this.props.dish.price * this.state.quantity;
      console.log(itemPrice);
      this.props.addPrice(
        itemPrice,
        this.props.dish.name,
        this.state.quantity,
        this.props.dish.id
      );
    } else {
      alert("Please enter quantity");
    }
  }

  render() {
    return (
      <div className="dish">
        <p className="dish-name">{this.props.dish.name}</p>
        <p className="dish-price">£{this.props.dish.price.toFixed(2)}</p>
        <label className="dish-quantity">
          Quantity: <br />
          <input
            onChange={this.addQuantity}
            type="text"
            size="2"
            placeholder="0"
          />
        </label>

        <button className="add-to-order-button" onClick={this.addToOrder}>
          Add to order
        </button>
        <br />
        <Nutrition dish={this.props.dish.nutrition} />
      </div>
    );
  }
}

export default Dish;
