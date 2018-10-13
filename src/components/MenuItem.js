import React from "react";
import Extras from './Extras';

function MenuItem({ item, receiveOrder, extras, formatToMoney }) {
  return (
    <div className="menu__item">
      <h4 className="menu__item__name">{item.name}</h4>
      <p className="menu__item__price">
        {formatToMoney(item.price)}
      </p>
      <Extras itemId={item.id} item={item} formatToMoney={formatToMoney} extras={extras} />
      <button className="menu__item__add" onClick={() => receiveOrder(item)}>
        Add to order
      </button>
    </div>
  );
}

export default MenuItem;
