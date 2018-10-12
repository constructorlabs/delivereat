import React from 'react';

class BasketItem extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.removeFromOrder(this.props.data);
  }

  render() {
    return (
      <div>
        <div>{`${this.props.data.name} £${this.props.data.price.toFixed(2)}`}</div>
        <button onClick={this.handleClick}>Remove</button>
      </div>
    );
  }
}

export default BasketItem;