import React from "react";
import OrderItem from './OrderItem'
import addMinutes from 'date-fns/add_minutes'
import format from 'date-fns/format'



import "../styles/ConfirmationOrder.scss";


class ConfirmationOrder extends React.Component {
  constructor() {
    super()
    this.deliveryTime = this.deliveryTime.bind(this)
    this.orderTime = this.orderTime.bind(this)

  }


  deliveryTime() {
    return (format(addMinutes(this.props.orderConfirmation.dateTime,30),'HH:mm'))
  }

  orderTime() {
    return (format(addMinutes(this.props.orderConfirmation.dateTime,0),'HH:mm'))
  }


    render(){
      return (
        <div className="confirmation__order">
        <p><strong>Order ID : {this.props.orderConfirmation.id}</strong></p>
        <p><strong>Ordered at : {this.orderTime()}</strong></p>
        <p><strong>With you by : {this.deliveryTime()}</strong></p>

        <p></p>
        <p>Your Order</p>

        <ul className="order__items">
            {Object.values(this.props.newOrder).map(orderItem => {
                return <OrderItem menuItem={this.props.menu[orderItem.id]} orderItem={orderItem} key={orderItem.id} />
            })}
        </ul>


        </div>
      )
    }  
}

export default ConfirmationOrder;