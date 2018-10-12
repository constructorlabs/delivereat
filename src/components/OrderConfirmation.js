import React from 'react'

import OrderItem from "./OrderItem.js"

class OrderConfirmation extends React.Component{
  constructor(){
    super()

    this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
  }

  handlePlaceOrder(event){
    event.preventDefault()
    this.props.placeOrder()
  }



  render(){
    return(
      <div>

        <ul>
          {Object.values(this.props.currentOrder.items).map(item => {
            return <OrderItem key={item.menuItem.id} item={item} amendQuantity={this.props.amendQuantity} addToOrder={this.props.addToOrder} removeFromOrder={this.props.removeFromOrder}/>
          })}
        </ul>
        <div className="order-confirmation__total">
          <span>Delivery: £5.00 </span>
          <span>Total to pay: {this.props.currentOrder.total}</span>
          <button onClick={this.handlePlaceOrder}>Place Order</button>
        </div>

      </div>

    )
  }
}

export default OrderConfirmation
