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
        <i className="fas fa-minus-circle" />
      </button>
      <span className="amount__count">{quantity}</span>
      <button
        onClick={e => handleBasketChange(e, id)}
        className="btn btn__increase"
        name="increase"
      >
        <i className="fas fa-plus-circle" />
      </button>
      <span className="basket__item__name">{name}</span>
      <button
        onClick={e => removeFromBasket(id)}
        className="btn btn__removeItem"
      >
        <i className="far fa-trash-alt" />
      </button>
      <span className="basket__item__price">
        £{(quantity * price).toFixed(2)}
      </span>
    </li>
  );
};
export default BasketItem;
