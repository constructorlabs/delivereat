import React from "react";

function MenuItem({ menu }) {
  return (
    <div className="menuitem">
      <h2>{menu.name}</h2>
      <img className="menuitem__image" src={menu.img} alt={menu.name} />
      <h3>£{menu.price}</h3>
      <h3>({menu.type})</h3>
    </div>
  );
}

export default MenuItem;
