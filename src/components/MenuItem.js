import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import '../styles/MenuItem.scss';

function MenuItem({menuItem,addToOrder,removeFromOrder,order,stage}) {

  function handleAdd(event) {
    const now = new Date();
    const coffee = Object.assign({},menuItem);
    coffee.timestamp = now.valueOf();
    addToOrder(coffee);
  }

  function handleRemove(event) {
    const coffee = Object.assign({},menuItem);
    removeFromOrder(coffee);
  }

  const inBasket = order.contents.length && order.contents.map(item => item[0].id).includes(menuItem.id);
  const count = inBasket ? order.contents.filter(item => item[0].id === menuItem.id)[0][1] : 0;
  const classesWrapper = cx('menu-item', {'menu-item--in-basket': inBasket, 'menu-item--greyed-out': stage === 'basket'});
  const classesRemove = cx('menu-item__remove-button', {'menu-item__remove-button--in-basket': inBasket});
  const classesCount = cx('menu-item__count', {'menu-item__count--in-basket': inBasket});

  return (
    <div className={classesWrapper}>
      <div className={'menu-item__title'}>
        <div className={'menu-item__name'}>{menuItem.name}</div>
        <div className={'menu-item__buttons'}>
          <button className={classesRemove} onClick={handleRemove}><i className="fas fa-minus-circle"></i></button>
          <div className={classesCount}>{count}</div>
          <button className={'menu-item__add-button'} onClick={handleAdd}><i className="fas fa-plus-circle"></i></button>
        </div>
      </div>
      <div className={'menu-item__description'}>{menuItem.description}</div>
      <div className={'menu-item__price'}>{`£${menuItem.price.toFixed(2)}`}</div>
    </div>
  );
}

MenuItem.propTypes = {
  stage: PropTypes.string.isRequired,
  order: PropTypes.object.isRequired,
  menuItem: PropTypes.object.isRequired,
  addToOrder: PropTypes.func.isRequired,
  removeFromOrder: PropTypes.func.isRequired
};

export default MenuItem;