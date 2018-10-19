import React from "react";
import OrderItem from './OrderItem'
import '../styles/Order.scss';


function Order({newOrder, menu, orderTotals, sendOrder, customer, handleClickLogout, handleClickLogin}){
      return (
        <div className="orders">
        <ul className="order__items">
            {Object.values(newOrder).map(orderItem => {
                return <OrderItem menuItem={menu[orderItem.id]} orderItem={orderItem} key={orderItem.id} />
            })}
        </ul>
        <p><strong>{orderTotals.deliveryMessage}</strong></p>
        <p>Discount :{!orderTotals.discount?"10% on order more than £50":`£${orderTotals.discount.toFixed(2)}`}</p>
        <p>Pizzas : £{orderTotals.itemsCost}</p>
        <p>Delivery : £{orderTotals.deliveryCost} </p>
        <p></p>
        <p><strong>Total :£{orderTotals.itemsCost?orderTotals.itemsCost + orderTotals.deliveryCost - orderTotals.discount:0} </strong></p>
        {!!customer.name === true && (
          <p>Logged in as {customer.name} <button onClick={handleClickLogout}>Logout</button></p>
        )}
        {!customer.name === true && (
          <p><button id="login" onClick={handleClickLogin}>Login / Register</button></p>
        )}
        


        {orderTotals.itemsCost > 1 && (      
          <button id="order" onClick={sendOrder}>ORDER ME PIZZA!!!</button>
        )}

        </div>
      )
    }  

export default Order;