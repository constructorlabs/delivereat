import React from "react";

class MenuItem extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.receiveOrder(this.props.item);
  }

  render() {
    return (
      <div>
        <h2>
          {this.props.item.name}{" "}
          {this.props.item.price.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP"
          })}
        </h2>
        <button onClick={this.handleClick}>Add to order</button>
      </div>
    );
  }
}

export default MenuItem;
