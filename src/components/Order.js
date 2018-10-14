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
      <div className="order__wrapper">
        <div className="order">
          <h3 className="order__item">{name}</h3>
          {/* <img
            className="order__image"
            src="https://loremflickr.com/320/240"
            alt=""
          /> */}
          <p className="order__description">{description}</p>
          <div className="order__meta">
            <button
              onClick={() => this.decreaseOrderAmount()}
              className="btn btn__decrease"
              name="decrease"
            >
              <i className="fas fa-minus-circle" />
            </button>

            <span className="amount__count">{quantity}</span>

            <button
              onClick={e => this.increaseOrderAmount(e)}
              className="btn btn__increase"
              name="increase"
            >
              <i className="fas fa-plus-circle" />
            </button>

            <span className="order__cost">
              {' '}
              £{(quantity * price).toFixed(2)}
            </span>
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
      </div>
    );
  }
}
export default Order;
