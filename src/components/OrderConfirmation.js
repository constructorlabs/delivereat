import React from 'react'

class OrderConfirmation extends React.Component{
  constructor(){
    super()
  }

  render(){
    return (
      <div>
        <h4>The chef has received your order</h4>
        <div>

        </div>
        <h5>Your order reference is {this.props.recentOrder.id}</h5>
      </div>
    )
  }
}

export default OrderConfirmation
