import React from "react";
import MenuItem from "./MenuItem";

function MenuPage({ menuClasses, menuObject, formatToMoney }) {
  return (
    <div className={menuClasses}>
      <h2 className="menu__heading">Our Menu</h2>
      <h3 className="menu__subheading">Burgers</h3>
      {menuObject.burgers.map(item => (
        <MenuItem
          key={"menu" + item.name + item.id}
          item={item}
          formatToMoney={formatToMoney}
        />
      ))}
      <h3 className="menu__subheading">Fries</h3>
      {menuObject.fries.map(item => (
        <MenuItem
          key={"menu" + item.name + item.id}
          item={item}
          formatToMoney={formatToMoney}
        />
      ))}
    </div>
  );
}

export default MenuPage;
