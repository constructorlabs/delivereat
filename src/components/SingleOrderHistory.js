import React from "react";

function SingleOrderHistory(props){

  return(
    <ul>
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
