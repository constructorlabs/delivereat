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
    const { itemName, itemPrice } = currentOrderItem;
    const { quantity } = this.state;

    return (
      <div className="order">
        <h3 className="order__item">{itemName}</h3>
        <div className="order__amount">
          <button
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
          </button>
          <span className="order__cost"> £{quantity * itemPrice}</span>
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
            onClick={() => addOrderToBasket(itemName, quantity, itemPrice)}
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
