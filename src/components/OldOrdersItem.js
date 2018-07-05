import React from "react";

function OlderOrdersItem({
  number,
  prevOrder,
  previousOrders,
  handleDelete,
  handleReorder
}) {
  function oldOrderReorder(event) {
    handleReorder(previousOrders[prevOrder]);
  }

  function oldOrderDelete(event) {
    handleDelete(number);
  }

  return Object.keys(previousOrders[prevOrder]).map(singleItem => {
    if (singleItem == "total") return;
    return (
      <div>
        <ul>
          <li key={number} className="display__oldOrders-items">
            <p>{previousOrders[prevOrder][singleItem].name}</p>
            <p className="oldOrders__item-name">
              x{previousOrders[prevOrder][singleItem].quantity}
            </p>
          </li>
          <p>
            Total:<br /> £ {previousOrders[prevOrder].total}
          </p>
        </ul>
        <button onClick={oldOrderReorder}>Reorder</button>
        <button onClick={oldOrderDelete}>Delete Order</button>
      </div>
    );
  });
}

export default OlderOrdersItem;
