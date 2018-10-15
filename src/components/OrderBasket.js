import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "../styles/OrderBasket.scss";
import OrderCalc from './OrderCalc';

library.add(faPlus, faMinus);

class OrderBasket extends React.Component {
  constructor() {
    super();


  }



  render() {
    return (
      <div>
        {this.props.order.map(eachOrder => {
          return (
            <div>
              <p>{eachOrder.name}</p>
              {/* <img src={imageLink} /> */}
              <p>
                {eachOrder.price.toLocaleString("en-UK", {
                  style: "currency",
                  currency: "GBP"
                })}
              </p>
              <div className="order__number">
                <FontAwesomeIcon icon="minus" onClick={() => this.props.receiveClickMinus(eachOrder.name)} />
                {eachOrder.number}
                <FontAwesomeIcon icon="plus" onClick={() => this.props.receiveClickPlus(eachOrder.name)} />
              </div>
            </div>
          );
        })}
        {this.props.order.length > 0 ? (
          <OrderCalc
            order={this.props.order}
            receiveOrderSubmit={this.props.receiveOrderSubmit}
          />
        ) : null}
      </div>
    );
  }
}

export default OrderBasket;
