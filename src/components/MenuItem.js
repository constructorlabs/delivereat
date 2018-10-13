import React from "react";

function MenuItem({ item, receiveOrder, extras }) {
  return (
    <div className="menu__item">
      <h4 className="menu__item__name">{item.name}</h4>
      <p className="menu__item__price">
        {item.price.toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP"
        })}
      </p>
      <button className="menu__item__add" onClick={receiveOrder}>
        Add to order
      </button>
    </div>
  );
}

export default MenuItem;
