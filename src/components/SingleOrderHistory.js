import React from "react";
import "../styles/SingleOrderHistory.scss";

function SingleOrderHistory(props){

  return(
    <ul>
      <li>#{props.orderID}</li>
      {
        props.orderContent.map(eachOrder=>{
          return <li>{eachOrder.name}</li>
        })
      }
      <li>Total cost: £{props.orderCost.totalCost}</li>
    </ul>
  )
}

export default SingleOrderHistory;
