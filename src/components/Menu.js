import React from "react";
import MenuItem from "./MenuItem";

function Menu({ menuObject, receiveOrder }) {
  return (
    <div className="menu__container">
      <h2 className="menu__title__burger">Burgers</h2>
      {menuObject.burgers.map(item => (
        <MenuItem key={item.id} receiveOrder={receiveOrder} item={item} />
      ))}
      <h2 className="menu__title__fries">Fries</h2>
      {menuObject.fries.map(item => (
        <MenuItem key={item.id} receiveOrder={receiveOrder} item={item} />
      ))}
    </div>
  );
}

export default Menu;
