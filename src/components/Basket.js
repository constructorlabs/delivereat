import React from 'react';
import BasketItem from './BasketItem';
import cx from 'classnames';
import '../styles/Basket.scss';

class Basket extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleClickOnBasket = this.handleClickOnBasket.bind(this);
    this.state = {basketDetailsVisible: false};
  }

  handleClick(event) {
    this.props.submitOrder();
  }

  handleClickOnBasket(event) {
    if (this.state.basketDetailsVisible) {
      this.setState({basketDetailsVisible: false});
    } else {
      this.setState({basketDetailsVisible: true});
    }
  }

  render() {
    const countItems = this.props.order.contents.map(item => item[1]).reduce((a,b)=>(a+b));
    const total = this.props.order.total.toFixed(2);

    const classes = cx('basket-details',{'basket-details--visible': this.state.basketDetailsVisible});
    return (
      <div className={'basket'}>
        <div className={classes}>
          {this.props.order.contents.map(item => <BasketItem key={item[0].timestamp} data={item} addToOrder={this.props.addToOrder} removeFromOrder={this.props.removeFromOrder} />)}
          <button onClick={this.handleClick}>Checkout</button>
        </div>
        <div className={'basket-summary'} onClick={this.handleClickOnBasket}>
          <div className={'basket-summary__count'}>{countItems}</div>
          <div className={'basket-summary__text'}>View Basket</div>
          <div className={'basket-summary__total'}>{`£${total}`}</div>
        </div>
      </div>
    );
  }
}

export default Basket;