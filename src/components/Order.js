import React from "react";
import OrderItem from "./OrderItem";

import "../styles/components/order.scss";

class Order extends React.Component {
  constructor(){
    super();

    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.anotherScreen();
  }

  render() {
    return (
      <form> 
        <h3>Your basket: </h3>
        {Object.keys(this.props.order).map(key => (
          <OrderItem key={key} item={this.props.order[key]} />
        ))}
        <p className='order'>Your order: {this.props.totalFoodPrice}</p>
        <p className='delivery'>Delivery charge: {this.props.deliveryCharge}</p>
        <p className='total'>Total: {this.props.finalPrice}</p>
        <button className='feedMe' onClick={this.handleSubmit}>Feed Me!</button>
      </form>
    );
  }
}

export default Order;
