import React from "react";
import MenuItem from "./MenuItem";

function Menu({ menuArray, receiveOrder }) {
  return (
    <div>
      {menuArray.map(item => (
        <MenuItem key={item.id} receiveOrder={receiveOrder} item={item} />
      ))}
    </div>
  );
}

export default Menu;
