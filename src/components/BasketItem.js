import React from 'react';

class BasketItem extends React.Component {
  constructor(props) {
    super(props);

    // this.increaseOrderAmount = this.increaseOrderAmount.bind(this);
    // this.decreaseOrderAmount = this.decreaseOrderAmount.bind(this);
  }

  // increaseOrderAmount() {
  //   this.setState({
  //     quantity: this.state.quantity + 1
  //   });
  // }

  // decreaseOrderAmount() {
  //   if (this.state.quantity > 0) {
  //     this.setState({
  //       quantity: this.state.quantity - 1
  //     });
  //   }
  // }

  render() {
    const { id, name, price, quantity } = this.props.orderItem;

    return (
      <li className="order">
        {name} £{quantity * price}
        {/* <button
          onClick={() => this.decreaseOrderAmount()}
          className="ammount_decrease"
          name="decrease"
        >
          [-]
        </button>
        <span className="amount__count">{quantity}</span>
        <button
          onClick={e => this.increaseOrderAmount(e)}
          className="ammount_increase"
          name="increase"
        >
          [+]
        </button> */}
      </li>
    );
  }
}
export default BasketItem;
