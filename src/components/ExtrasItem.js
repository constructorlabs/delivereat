import React from "react";

function ExtrasItem({ extraItem, formatToMoney, item }) {
  return (
    <div className="extras__item">
      <label className="extras__item__name">
        {extraItem.name} {formatToMoney(extraItem.price)}{" "}
      </label>
      <input className="extras__item__checkbox" type="checkbox"></input>
    </div>
  );
}

export default ExtrasItem;
