import React from 'react';
import BasketItem from './BasketItem';
import cx from 'classnames';
import '../styles/Basket.scss';

class Basket extends React.Component {
  constructor() {
    super();

    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleClickOnBasket = this.handleClickOnBasket.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {basketDetailsVisible: false};
  }

  handleClose(event) {
    this.setState({basketDetailsVisible: false});
    this.props.changeStage('menu');
  }

  handleCheckout(event) {
    this.props.checkout();
    this.props.changeStage('menu');
  }

  handleClickOnBasket(event) {
    this.setState({basketDetailsVisible: true});
    this.props.changeStage('basket');
  }

  render() {

    const countItems = this.props.order.contents.map(item => item[1]).reduce((a,b)=>(a+b));
    const total = this.props.order.total.toFixed(2);
    const basketDetailsClasses = cx('basket-details',{'basket-details--visible': this.state.basketDetailsVisible});
    const basketSummaryClasses = cx('basket-summary',{'basket-summary--visible': !this.state.basketDetailsVisible})
    const checkoutClasses = cx('basket-checkout',{'basket-checkout--visible': this.state.basketDetailsVisible});

    return (
      <div className={'basket'}>
        <div className={basketDetailsClasses}>
          <div className='basket-details__close' onClick={this.handleClose}>&times;</div>
          {this.props.order.contents.map(item => <BasketItem key={item[0].timestamp} data={item} addToOrder={this.props.addToOrder} removeFromOrder={this.props.removeFromOrder} />)}
          <div className='basket-details__delivery'>
            <div className='basket-details__delivery-text'>Delivery charge</div>
            <div className='basket-details__delivery-price'>£2.00</div>
          </div>
          <div className='basket-details__total'>
            <div className='basket-details__total-text'>Order total</div>
            <div className='basket-details__total-price'>{`£${(this.props.order.total+2).toFixed(2)}`}</div>
          </div>
        </div>
        <div className={basketSummaryClasses} onClick={this.handleClickOnBasket}>
          <div className={'basket-summary__count'}>{countItems}</div>
          <div className={'basket-summary__text'}>View Basket</div>
          <div className={'basket-summary__total'}>{`£${total}`}</div>
        </div>
        <div className={checkoutClasses} onClick={this.handleCheckout}>Checkout!</div>
      </div>
    );
  }
}

export default Basket;