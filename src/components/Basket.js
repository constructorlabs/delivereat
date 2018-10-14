import React from 'react';
import BasketItem from './BasketItem';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../styles/Basket.scss';

function Basket({changeStage,checkout,order,stage,addToOrder,removeFromOrder}) {

  const countItems = order.contents.map(item => item[1]).reduce((a,b)=>(a+b));
  const total = order.total.toFixed(2);
  const basketDetailsClasses = cx('basket-details',{'basket-details--visible': (stage === 'basket')});
  const basketSummaryClasses = cx('basket-summary',{'basket-summary--visible': !(stage === 'basket')})
  const checkoutClasses = cx('basket-checkout',{'basket-checkout--visible': (stage === 'basket')});

  return (
    <div className={'basket'}>
      <div className={basketDetailsClasses}>
        <div className='basket-details__close' onClick={()=>changeStage('menu')}>&times;</div>
        {order.contents.map(item => <BasketItem key={item[0].timestamp} basketItem={item} addToOrder={addToOrder} removeFromOrder={removeFromOrder} />)}
        <div className='basket-details__delivery'>
          <div className='basket-details__delivery-text'>Delivery charge</div>
          <div className='basket-details__delivery-price'>£2.00</div>
        </div>
        <div className='basket-details__total'>
          <div className='basket-details__total-text'>Order total</div>
          <div className='basket-details__total-price'>{`£${(order.total+2).toFixed(2)}`}</div>
        </div>
      </div>
      <div className={basketSummaryClasses} onClick={()=>changeStage('basket')}>
        <div className={'basket-summary__count'}>{countItems}</div>
        <div className={'basket-summary__text'}>View Basket</div>
        <div className={'basket-summary__total'}>{`£${total}`}</div>
      </div>
      <div className={checkoutClasses} onClick={()=>checkout()}>Checkout</div>
    </div>
  );
}

Basket.propTypes = {
  stage: PropTypes.string.isRequired,
  changeStage: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  addToOrder: PropTypes.func.isRequired,
  removeFromOrder: PropTypes.func.isRequired
};

export default Basket;