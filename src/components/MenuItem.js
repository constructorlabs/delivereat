import React from "react";

function MenuItem({ menu }) {
  return (
    <div className="menuitem">
      <h2>{menu.name}</h2>
      <h3>£{menu.price}</h3>
      <h3>({menu.type})</h3>
    </div>
  );
}

export default MenuItem;
