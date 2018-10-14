import React from "react";
import "../styles/OrderCalc.scss"

class OrderCalc extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.receiveOrderSubmit();
  }

  render() {
    const totalFoodCost = this.props.order
      .map(eachOrder => {
        return eachOrder.price * eachOrder.number;
      })
      .reduce((acc, item) => acc + item);

    const deliveryCost = totalFoodCost * 0.1;
    const totalCost = totalFoodCost * 1.1;

    return (
      <div className="order__calc">
        <p>
          Food cost:
          {totalFoodCost.toLocaleString("en-UK", {
            style: "currency",
            currency: "GBP"
          })}
        </p>
        <p>
          Delivery fee:
          {deliveryCost.toLocaleString("en-UK", {
            style: "currency",
            currency: "GBP"
          })}
        </p>
        <p>
          Total cost:
          {totalCost.toLocaleString("en-UK", {
            style: "currency",
            currency: "GBP"
          })}
        </p>
        <p className="button" type="button" onClick={this.handleSubmit}>
          Submit order
        </p>
      </div>
    );
  }
}

export default OrderCalc;
