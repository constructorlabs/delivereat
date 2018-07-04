import React from "react";

function OldOrders({
  oldItem,
  number,
  handleDelete,
  previousOrders,
  handleReorder
}) {
  function oldOrderReorder(event) {
    handleReorder(oldItem);
  }

  function oldOrderDelete(event) {
    console.log(number);
    handleDelete(number);
  }

  return (
    <div className="display__oldOrders">
      <h3 className="oldOrders__title">
        Previous <br />Order
      </h3>

      {Object.keys(oldItem).map(singleItem => {
        {
          if (singleItem == "total") return;
        }
        return (
          <ul>
            <li key={singleItem} className="display__oldOrders-items">
              <p>{oldItem[singleItem].name}</p>
              <p className="oldOrders__item-name">
                x{oldItem[singleItem].quantity}
              </p>
            </li>
          </ul>
        );
      })}

      <p>
        Total: <br /> £ {oldItem.total}
      </p>
      <button onClick={oldOrderReorder}>Reorder</button>
      <button onClick={oldOrderDelete}>Delete Order</button>
      <img className="orders__image" src="./static/images/coolpizzalogo.png" />
    </div>
  );
}

export default OldOrders;
