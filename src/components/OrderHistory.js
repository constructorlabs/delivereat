import React from "react";
import SingleOrderHistory from "./SingleOrderHistory";
import "../styles/OrderHistory.scss";

function OrderHistory(props) {
  const placedOrders = Object.values(props.placedOrders);

  return (
    <div className="order__history">
      {placedOrders.map(eachOrder => {
        return (
          <SingleOrderHistory
            orderContent={eachOrder.order}
            orderCost={eachOrder.cost}
            orderID={eachOrder.id}
          />
        );
      })}
    </div>
  );
}

export default OrderHistory;
