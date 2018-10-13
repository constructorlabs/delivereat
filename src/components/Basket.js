import React from 'react';
import BasketItem from './BasketItem';

const Basket = ({ basket, submitOrder }) => {
  return (
    <div className="basket">
      <h2 className="basket__title">Your order</h2>
      <ul className="order__list">
        {Object.values(basket).map(item => {
          return <BasketItem key={item.id} orderItem={item} />;
        })}
      </ul>
      <button onClick={() => submitOrder()} className="btn btn__submitOrder">
        Place Order
      </button>
    </div>
  );
};
export default Basket;
