import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import '../styles/order.scss';

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      extras: []
    };

    this.increaseOrderAmount = this.increaseOrderAmount.bind(this);
    this.decreaseOrderAmount = this.decreaseOrderAmount.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
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

  //TODO: match the selected checkbox to the extras stored in state

  handleCheckbox(addOn) {
    if (!this.state.extras.includes(addOn)) {
      const updatedExtras = this.state.extras.concat(addOn);
      this.setState(
        {
          extras: updatedExtras
        },
        () => {
          console.log(this.state.extras.indexOf(addOn.extra));
        }
      );
    } else {
      console.log(this.state.extras.indexOf(addOn.extra));
      const updatedExtras = this.state.extras.filter(item => {
        return item.extra != addOn.extra;
      });
      this.setState({
        extras: updatedExtras
      });
    }
  }

  render() {
    const { currentOrderItem, addOrderToBasket, closeOrder } = this.props;
    const { name, price, description, extras, extrasPrice } = currentOrderItem;
    const { quantity } = this.state;

    return (
      <CSSTransitionGroup
        transitionName="modal"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="order__wrapper">
          <div className="order">
            <h3 className="order__item">{name}</h3>
            <p className="order__description">{description}</p>

            {!!extras && (
              <form>
                <h4>Add extras</h4>
                {extras.map(extra => {
                  return (
                    <div key={extra}>
                      <input
                        type="checkbox"
                        id={extra}
                        name="extras"
                        value={extra}
                        onChange={e => this.handleCheckbox({ extra })}
                      />
                      <label>
                        {extra}
                        {/* £{extrasPrice.toFixed(2)} */}
                      </label>
                    </div>
                  );
                })}
              </form>
            )}

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
            {/* Order action controls */}
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
      </CSSTransitionGroup>
    );
  }
}
export default Order;
