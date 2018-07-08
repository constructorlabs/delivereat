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

  return (
    <div>
      {Object.keys(previousOrders[prevOrder]).map(singleItem => {
        if (singleItem == "total") return;
        return (
          <ul className="display__oldOrders-items">
            <li key={number}>
              <p>
                {previousOrders[prevOrder][singleItem].name} x{
                  previousOrders[prevOrder][singleItem].quantity
                }
              </p>
            </li>
          </ul>
        );
      })};
      <p className="old-orders__total">
        Total:<br /> £ {previousOrders[prevOrder].total}
      </p>
      <button onClick={oldOrderReorder}>Reorder</button>
      <button onClick={oldOrderDelete}>Delete Order</button>
    </div>
  );
}

export default OlderOrdersItem;
