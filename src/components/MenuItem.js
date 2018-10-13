import React from "react";

function MenuItem({item, addOrder})  {

function handleSubmit(event) {
  event.preventDefault();

  const order = {
    id : item.id,
    quantity : 1,
    price : item.price,
    name : item.name
  }

  addOrder(order);
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>{item.name}</h2>
      <img src={item.image}/>
      <p>£{item.price}</p>
      <button>Press Me!</button>
    </form>
  );
}
export default MenuItem;
