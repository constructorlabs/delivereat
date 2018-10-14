import React from "react";

function MenuItem({
  item,
  formatToMoney,
}) {
  return (
    <div className="menu__item">
      <h4 className="menu__item__name">{item.name}</h4>
      <p className="menu__item__price">{formatToMoney(item.price)}</p>
      <p className="menu__item__description">{item.description}</p>
    </div>
  );
}

export default MenuItem;
