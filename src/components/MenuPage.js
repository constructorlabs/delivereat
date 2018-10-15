import React from "react";
import MenuItem from "./MenuItem";

function MenuPage({ menuClasses, menuObject, formatToMoney }) {
  return (
    <div className={menuClasses}>
      <h2 className="menu__heading">Our Menu</h2>
      <h3 className="menu__subheading">Burgers</h3>
      <img
        src="https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=80a0e355a5f83d806f9b72782c7fa19b&auto=format&fit=crop&w=853&q=80"
      />
      {menuObject.burgers.map(item => (
        <MenuItem
          key={"menu" + item.name + item.id}
          item={item}
          formatToMoney={formatToMoney}
        />
      ))}
      <h3 className="menu__subheading">Fries</h3>
      <img
        src="https://images.unsplash.com/photo-1534938665420-4193effeacc4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1ed7648548bd3112e6664027b01694b1&auto=format&fit=crop&w=751&q=80"
      />
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
