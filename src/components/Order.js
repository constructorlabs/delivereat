import React from "react";
import OrderItem from './OrderItem'


import "../styles/App.scss";

class Order extends React.Component {
  constructor() {
    super()

    this.state = {
      deliveryMessage:'Free delivery on orders over £30'
    }

    this.deliveryMessage = this.deliveryMessage.bind(this);
  }

  deliveryMessage() {
    if (this.props.orderTotals.itemsCosts === 0) {
      this.setState({deliveryMessage:'Free delivery on orders over £30'})
    }
    else {
      this.setState({deliveryMessage:this.props.orderTotals.delivery<30?`Spend £${30 - this.props.orderTotals.itemsCosts} more for free delivery`: 'Delivery is Free!'})
    }
  }



    render(){
      return (
        <div>
        <ul>
            {Object.values(this.props.newOrder).map(orderItem => {
                return <OrderItem menuItem={this.props.menu[orderItem.id]} orderItem={orderItem} key={orderItem.id} />
            })}
        </ul>
        <p>Pizzas : £ {this.props.orderTotals.itemsCost}</p>
        <p>Discount : £ {!this.props.orderTotals.discount?"10% on order more than £50":this.props.orderTotals.discount.toFixed(2)}</p>
        <p>Delivery : £ {this.props.orderTotals.delivery} </p>
        <p>{this.state.deliveryMessage}</p>
        <button onClick={this.props.sendOrder}>Send</button>

        </div>
      )
    }  
}

export default Order;