import React from "react";
import OrderItem from './OrderItem'


import "../styles/Orders.scss";

class Order extends React.Component {
  constructor() {
    super()
  }


    render(){

      return (
        <div className="orders">
        <ul className="order__items">
            {Object.values(this.props.newOrder).map(orderItem => {
                return <OrderItem menuItem={this.props.menu[orderItem.id]} orderItem={orderItem} key={orderItem.id} />
            })}
        </ul>
        <p><strong>{this.props.orderTotals.deliveryMessage}</strong></p>
        <p>Discount :{!this.props.orderTotals.discount?"10% on order more than £50":`£${this.props.orderTotals.discount.toFixed(2)}`}</p>
        <p>Pizzas : £{this.props.orderTotals.itemsCost}</p>
        <p>Delivery : £{this.props.orderTotals.deliveryCost} </p>
        <p></p>
        <p><strong>Total :£{this.props.orderTotals.itemsCost?this.props.orderTotals.itemsCost + this.props.orderTotals.deliveryCost - this.props.orderTotals.discount:0} </strong></p>
        {!!this.props.customer.name === true && (
          <p>Logged in as {this.props.customer.name} <button onClick={this.props.handleClickLogout}>Logout</button></p>
        )}
        {!this.props.customer.name === true && (
          <p><button id="login" onClick={this.props.handleClickLogin}>Login / Register</button></p>
        )}
        


        {this.props.orderTotals.itemsCost > 1 && (      
          <button id="order" onClick={this.props.sendOrder}>ORDER ME PIZZA!!!</button>
        )}

        </div>
      )
    }  
}

export default Order;