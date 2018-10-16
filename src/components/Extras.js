import React from "react";
import ExtrasItem from "./ExtrasItem";

function Extras({ extras, itemId, formatToMoney, item, currentOrder }) {
  return (
    <div className="extras__container">
      {extras.map(extraItem => (
        <ExtrasItem
          key={itemId + extraItem.id}
          formatToMoney={formatToMoney}
          extraItem={extraItem}
          item={item}
          currentOrder={currentOrder}
        />
      ))}
    </div>
  );
}

export default Extras;
