import React from "react";

function OrderHistoryItem({ item }) {
  return (
    <div className="order-history-item">
      {Object.keys(item).map(newItem => {
        <p>{item[newItem].id}</p>;
      })}
    </div>
  );
}

export default OrderHistoryItem;
