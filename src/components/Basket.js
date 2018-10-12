import React from 'react';
import BasketItem from './BasketItem';

class Basket extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.submitOrder();
  }

  render() {
    return (
      <div>
        {this.props.order.contents.map(item => <BasketItem key={item.timestamp} data={item} removeFromOrder={this.props.removeFromOrder} />)}
        <div>{`total: £${this.props.order.total.toFixed(2)}`}</div>
        <button onClick={this.handleClick}>Checkout</button>
      </div>
    );
  }
}

export default Basket;