import React from 'react';

const BasketItem = ({ orderItem, handleBasketChange, removeFromBasket }) => {
  const { id, name, price, quantity } = orderItem;

  return (
    <li className="basket__item">
      <button
        onClick={e => handleBasketChange(e, id)}
        className="btn btn__decrease"
        name="decrease"
      >
        [-]
      </button>
      <span className="amount__count">{quantity}</span>
      <button
        onClick={e => handleBasketChange(e, id)}
        className="btn btn__increase"
        name="increase"
      >
        [+]
      </button>
      {name} £{quantity * price}
      <button
        onClick={e => removeFromBasket(id)}
        className="btn btn__removeItem"
      >
        {' '}
        Remove{' '}
      </button>
    </li>
  );
};
export default BasketItem;
