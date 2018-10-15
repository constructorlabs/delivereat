import React from 'react';
import PropTypes from 'prop-types';
import '../styles/BasketItem.scss';

function BasketItem({addToOrder,removeFromOrder,basketItem}) {

  return (
    <div className={'basket-item'}>
      <div className={'basket-item__title'}>
        <div className={'basket-item__name'}>{`${basketItem[0].name}`}</div>
        <div className={'basket-item__buttons'}>
          <button className={'basket-item__remove-button'} onClick={()=>removeFromOrder(basketItem[0])}>
            <i className="fas fa-minus-circle"></i>
          </button>
          <div className={'basket-item__count'}>{basketItem[1]}</div>
          <button className={'basket-item__add-button'} onClick={()=>addToOrder(basketItem[0])}>
            <i className="fas fa-plus-circle"></i>
          </button>
          <div className={'basket-item__line-total'}>
            {`£${(basketItem[0].price*basketItem[1]).toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  basketItem: PropTypes.array.isRequired,
  addToOrder: PropTypes.func.isRequired,
  removeFromOrder: PropTypes.func.isRequired
};

export default BasketItem;