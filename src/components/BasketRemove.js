import React from 'react';

function BasketRemove({item, removeOrder})  {

function handleClick(event) {
  event.preventDefault();

  const order = {
    id : item.id,
    quantity : 1,
    price : item.price,
    name : item.name
  }

  removeOrder(order);
}

  return (
    <div>
      <p>{item.name}, Qty: {item.quantity} = £{item.price}</p>
      <button onClick={handleClick}>Remove Item</button>
    </div>
  );
}

export default BasketRemove;
