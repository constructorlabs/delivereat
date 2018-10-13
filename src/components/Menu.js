import React from "react";
import MenuItem from "./MenuItem";

function Menu({ menuObject, receiveOrder, formatToMoney, currentOrder }) {
  return (
    <div className="menu__container">
      <h2 className="menu__title__burger">Burgers</h2>
      {menuObject.burgers.map(item => (
        <MenuItem
          key={item.id}
          extras={menuObject.extras}
          receiveOrder={receiveOrder}
          item={item}
          formatToMoney={formatToMoney}
          currentOrder={currentOrder}
        />
      ))}
      <h2 className="menu__title__fries">Fries</h2>
      {menuObject.fries.map(item => (
        <MenuItem
          key={item.id}
          receiveOrder={receiveOrder}
          extras={[]}
          item={item}
          formatToMoney={formatToMoney}
        />
      ))}
    </div>
  );
}

export default Menu;
