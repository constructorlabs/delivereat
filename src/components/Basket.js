import React from 'react';
import BasketItem from './BasketItem';

const Basket = ({
  basket,
  submitOrder,
  handleBasketChange,
  removeFromBasket
}) => {
  const delivery = 7.5;
  let total = Object.values(basket)
    .map(item => {
      return item.price * item.quantity;
    })
    .reduce((acc, item) => acc + item);
  const discount = 0.1;
  total > 30 ? (total = total - total * discount) : (total = total);

  return (
    <div className="basket">
      <h2 className="basket__title">Your order</h2>
      <ul className="order__list">
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
      <p>
        Delivery Charge <span>£{delivery.toFixed(2)}</span>
      </p>
      <p>
        Order total <span>£{total + delivery}</span>
      </p>
      <button onClick={() => submitOrder()} className="btn btn__submitOrder">
        Place Order
      </button>
    </div>
  );
};
export default Basket;
