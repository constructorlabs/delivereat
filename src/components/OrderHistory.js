import React from "react";
import SingleOrderHistory from "./SingleOrderHistory";

function OrderHistory(props) {
  const placedOrders = Object.values(props.placedOrders);


  return (
    placedOrders.map(eachOrder => {
      return <SingleOrderHistory orderContent={eachOrder.order} orderCost={eachOrder.cost} />

    })
  );
}

export default OrderHistory;
