import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faMinus);

class OrderItem extends React.Component {
  constructor() {
    super();

    this.handleClickPlus = this.handleClickPlus.bind(this);
    this.handleClickMinus = this.handleClickMinus.bind(this);
  }

  handleClickPlus(event) {
    this.props.receiveClickPlus(this.props.eachOrder.name);
  }

  handleClickMinus(event) {
    this.props.receiveClickMinus(this.props.eachOrder.name);
  }

  render() {
    const imageLink = `../../static/${this.props.eachOrder.name}.jpg`;
    return (
      <div>
        <h2>{this.props.eachOrder.name}</h2>
        <img src={imageLink} />
        <p>{this.props.eachOrder.price.toLocaleString("en-UK", {
          style: "currency",
          currency: "GBP"
        })}
        </p>
        <FontAwesomeIcon icon="minus" onClick={this.handleClickMinus} />
         {this.props.eachOrder.number} 
        <FontAwesomeIcon icon="plus" onClick={this.handleClickPlus} />
      </div>
    );
  }
}

export default OrderItem;
