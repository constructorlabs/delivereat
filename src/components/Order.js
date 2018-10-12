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
    if (this.state.quantity > 0) {
      this.setState({
        quantity: this.state.quantity - 1
      });
    }
  }

  render() {
    const { currentOrderItem, addOrderToBasket } = this.props;
    const { itemName, itemPrice } = currentOrderItem;

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
          <span className="amount__count">{this.state.quantity}</span>
          <button
            onClick={e => this.increaseOrderAmount(e)}
            className="ammount_increase"
            name="increase"
          >
            [+]
          </button>
        </div>
        <div className="order__action">
          <button className="btn btn__cancel" name="cancel">
            Cancel
          </button>
          <button
            className="btn btn__submit"
            onClick={() => addOrderToBasket(itemName, this.state.quantity)}
            type="submit"
            name="submit"
          >
            Add To Order for {itemPrice}
          </button>
        </div>
      </div>
    );
  }
}
export default Order;
