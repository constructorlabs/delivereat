import React from "react";

function MenuItem({item, addOrder})  {

function handleSubmit(event) {
  event.preventDefault();

  const min = 1;
  const max = 100;
  let keyId = Math.floor(Math.random() * (max - min + 1)) + min;
  let randomKey = item.id + keyId;

  const order = {
    id : randomKey,
    quantity : 1,
    price : item.price,
    name : item.name
  }

  addOrder(order);
}

  return (
    <form onSubmit={handleSubmit} className="menuitem_form">
      <h2>{item.name}</h2>
      <img src={item.image} className="menuitem_image"/>
      <p>£{item.price}</p>
      <button className="menuitem_addbutton">Press Me!</button>
    </form>
  );
}
export default MenuItem;
