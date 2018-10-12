import React from "react";

class OrderItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <p>
          {this.props.order.name}{" "}
          {this.props.order.price.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP"
          })}
        </p>
      </div>
    );
  }
}

export default OrderItem;
