import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import OrderItem from "./OrderItem";

library.add(faPlus, faMinus);

class Order extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {this.props.order.map(eachOrder => {
          return (
            <OrderItem
              order={eachOrder}
              receiveClickPlus={this.props.receiveClickPlus}
              receiveClickMinus={this.props.receiveClickMinus}
            />
          );
        })}
      </div>
    );
  }
}

export default Order;
