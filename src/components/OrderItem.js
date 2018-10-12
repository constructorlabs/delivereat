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
    this.props.receiveClickPlus(this.props.order.name);
  }

  handleClickMinus(event) {
    this.props.receiveClickMinus(this.props.order.name);
  }

  render() {
    const imageLink = `../../static/${this.props.order.name}.jpg`;
    return (
      <div>
        <h2>{this.props.order.name}</h2>
        <img src={imageLink} />
        <FontAwesomeIcon icon="minus" onClick={this.handleClickMinus} />
        {this.props.order.number}
        <FontAwesomeIcon icon="plus" onClick={this.handleClickPlus} />
      </div>
    );
  }
}

export default OrderItem;
