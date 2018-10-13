import React from "react";
import Extras from "./Extras";

function OrderMenuItem({ item, receiveOrder, extras, formatToMoney, currentOrder }) {
  return (
    <div className="menu__item">
      <h4 className="menu__item__name">{item.name}</h4>
      <p className="menu__item__price">{formatToMoney(item.price)}</p>
      <button className="menu__item__add" onClick={() => receiveOrder(item)}>
        Add to order
      </button>
    </div>
  );
}

export default OrderMenuItem;
