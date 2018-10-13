import React from 'react';

import '../styles/order.scss';

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    };

    this.increaseOrderAmount = this.increaseOrderAmount.bind(this);
    this.decreaseOrderAmount = this.decreaseOrderAmount.bind(this);
  }

  increaseOrderAmount() {
    this.setState({
      quantity: this.state.quantity + 1
    });
  }

  decreaseOrderAmount() {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1
      });
    }
  }

  render() {
    const { currentOrderItem, addOrderToBasket, closeOrder } = this.props;
    const { name, price, description } = currentOrderItem;
    const { quantity } = this.state;

    return (
      <div className="order">
        <h3 className="order__item">{name}</h3>
        <p>{description}</p>
        <div className="order__amount">
          <button
            onClick={() => this.decreaseOrderAmount()}
            className="btn btn__decrease"
            name="decrease"
          >
            [-]
          </button>
          <span className="amount__count">{quantity}</span>
          <button
            onClick={e => this.increaseOrderAmount(e)}
            className="btn btn__increase"
            name="increase"
          >
            [+]
          </button>
          <span className="order__cost"> £{quantity * price}</span>
        </div>
        <div className="order__action">
          <button
            onClick={() => closeOrder()}
            className="btn btn__cancel"
            name="cancel"
          >
            Cancel
          </button>
          <button
            className="btn btn__submit"
            onClick={() => addOrderToBasket(name, quantity, price)}
            type="submit"
            name="submit"
          >
            Add to order
          </button>
        </div>
      </div>
    );
  }
}
export default Order;
