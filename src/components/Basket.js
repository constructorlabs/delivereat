import React from 'react';
import BasketItem from './BasketItem';
import cx from 'classnames';

import '../styles/basket.scss';

class Basket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      basketHidden: true
    };

    this.toggleBasketVisible = this.toggleBasketVisible.bind(this);
  }

  toggleBasketVisible() {
    this.setState({
      basketHidden: !this.state.basketHidden
    });
  }

  render() {
    const {
      basket,
      submitOrder,
      handleBasketChange,
      removeFromBasket
    } = this.props;

    let total = Object.values(basket)
      .map(item => {
        return item.price * item.quantity;
      })
      .reduce((acc, item) => acc + item);

    let discountPercentage = 0;

    let deliveryCharge = 4.75;

    total > 40 ? (deliveryCharge = 0) : deliveryCharge;
    total > 30 ? (discountPercentage = 0.1) : discountPercentage;

    const basketClass = cx('basket__wrapper', {
      'basket__wrapper--hidden': this.state.basketHidden
    });

    const discount = cx('basket__discount', {
      'basket__discount--hidden': discountPercentage === 0
    });

    return (
      <div className="basket">
        <h4
          onClick={() => this.toggleBasketVisible()}
          className="basket__title"
        >
          Your order
        </h4>

        <div className={basketClass}>
          <ul className="basket__list">
            {Object.values(basket).map(item => {
              return (
                <BasketItem
                  key={item.id}
                  orderItem={item}
                  handleBasketChange={handleBasketChange}
                  removeFromBasket={removeFromBasket}
                />
              );
            })}
          </ul>
          <p className="basket__delivery">
            Delivery Charge <span>£{deliveryCharge.toFixed(2)}</span>
          </p>
          <p className={discount}>
            Discount <span>{discountPercentage * 100}%</span>
          </p>
          <p className="basket__total">
            Order total{' '}
            <span>
              £{(total - total * discountPercentage + deliveryCharge).toFixed(
                2
              )}
            </span>
          </p>
          <button onClick={() => submitOrder()} className="btn btn__submit">
            Place Order
          </button>
        </div>
      </div>
    );
  }
}

export default Basket;
