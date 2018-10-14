import React from "react";
import OrderItem from "./OrderItem";

import "../styles/components/order.scss";

class Order extends React.Component {
  constructor() {
    super();

    this.state = {
        customer: {},
        name: "",
        address: "",
        email: "",
        mobile: ''
      }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.order = {};
    this.setState({
        customer: {
            name: this.state.name,
            address: this.state.address,
            email: this.state.email,
            mobile: this.state.mobile
        },
        name: '',
        address: '',
        email: '',
        mobile: ''
    }, () => this.props.submitOrder(this.state.customer))
    
    
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
        <label className='name'>Full Name:</label>
        <input className='nameInput' onChange={this.handleChange} name="name" type="text" value={this.state.name} />
        <label className='address'>Address:</label>
        <input className='addressInput' onChange={this.handleChange} name="address" type="text" value={this.state.address}/>
        <label className='email'>Email:</label>
        <input className='emailInput' onChange={this.handleChange} name="email" type="email" value={this.state.email} />
        <label className='mobile'>Mobile:</label>
        <input className='mobileInput' onChange={this.handleChange} name="mobile" type="number" value={this.state.mobile} />
        <button className='feedMe' onClick={this.handleSubmit}>Feed Me!</button>
      </form>
    );
  }
}

export default Order;
