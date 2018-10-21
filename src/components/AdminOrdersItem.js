import React from "react";

import '../styles/AdminOrdersItem.scss';

class AdminOrdersItem extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)

    this.state = {
        quantity: 1
    }
  }

  handleClick(quantity) {
    this.props.receiverAddToOrder({id:this.props.menuItem.id, quantity:quantity==='add'?1:-1})
}

    render(){
      return (
        <li className="admin__item">
          <div className="adminOrders__id">ID: {this.props.order.id} -- {this.props.order.status}</div>
          <div className="adminOrders__name">{this.props.order.name}</div>
          <div className="adminOrders__street-address">{this.props.order.street_address}</div>
          <div className="adminOrders__post-code">{this.props.order.post_code}</div>
          <div className="adminOrders__telephone">{this.props.order.telephone}</div>
          <div className="adminOrders__item-count">ITEMS: {this.props.order.sum}</div>
          <button>Confirmed</button> <button>Being Made</button> <button>Out For Delivery</button> <button>Delivered!</button>

        </li>
      )
    }  
}

export default AdminOrdersItem;