import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import OrderItem from "./OrderItem";
import OrderCalc from './OrderCalc';

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
              eachOrder={eachOrder}
              receiveClickPlus={this.props.receiveClickPlus}
              receiveClickMinus={this.props.receiveClickMinus}
            />
          );
        })}
        {this.props.order.length>0?
        <OrderCalc order={this.props.order} receiveOrderSubmit={this.props.receiveOrderSubmit}/>
        : null}

      </div>
    );
  }
}

export default Order;
