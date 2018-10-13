import React from "react";

function ExtrasItem({ extraItem, formatToMoney, item, currentOrder }) {
  const clicked = {status: false};

  function addExtra() {
    clicked.status = true;
    item.extras.push(extraItem);
  }

  function removeExtra() {
    clicked.status = false;
    item.extras.splice(item.extras.indexOf(extraItem), 1);
  }

  const addClasses =
    clicked.status === false
      ? "extras__add__extra--visible"
      : "extras__add__extra--notVisible";

  const removeClasses =
    clicked.status === true
      ? "extras__remove__extra--visible"
      : "extras__remove__extra--notVisible";

  return (
    <div className="extras__item">
      <label className="extras__item__name">
        {extraItem.name} {formatToMoney(extraItem.price)}{" "}
      </label>
      <button className={removeClasses} onClick={removeExtra}>
        -
      </button>
      <button className={addClasses} onClick={addExtra}>
        +
      </button>
    </div>
  );
}

export default ExtrasItem;
