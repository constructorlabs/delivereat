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
      <div className="menu__item">
        <h4 className="menu__item__name">{this.props.item.name}</h4>
        <p className="menu__item__price">
          {this.props.item.price.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP"
          })}
        </p>
        <button className="menu__item__add" onClick={this.handleClick}>
          Add to order
        </button>
      </div>
    );
  }
}

export default MenuItem;
