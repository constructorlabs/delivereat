import React from "react";

function OldOrders({ handleDelete, previousOrders, handleReorder }) {
  function oldOrderReorder(event) {
    handleReorder(oldItem);
  }

  function getOrder(order) {
    return Object.keys(order).map(singleItem => {
      if (singleItem == "total") return <p style={{ color: "black" }}>TOTAL</p>;

      // console.log("test", order[singleItem]);
      // console.log("name", order[singleItem].name);
      return (
        <li key={singleItem} className="display__oldOrders-items">
          <p>{order[singleItem].name}</p>
          <p className="oldOrders__item-name">x{order[singleItem].quantity}</p>
        </li>
      );
    });
  }

  function oldOrderDelete(event) {
    console.log(number);
    handleDelete(number);
  }

  console.log("whole order", previousOrders);

  return (
    <div className="display__oldOrders">
      <h3 className="oldOrders__title">
        Previous <br />Order
      </h3>
      <ul>
        {Object.keys(previousOrders).map(prevOrder => {
          return (
            <li>
              <ul style={{ display: "flex" }}>
                {getOrder(previousOrders[prevOrder])}
              </ul>
            </li>
          );
        })}
      </ul>

      <p>
        Total:<br /> £ {previousOrders.total}
      </p>
      <button onClick={oldOrderReorder}>Reorder</button>
      <button onClick={oldOrderDelete}>Delete Order</button>
      <img className="orders__image" src="./static/images/coolpizzalogo.png" />
    </div>
  );
}

export default OldOrders;
