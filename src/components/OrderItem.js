import React from "react";

import "../styles/App.scss";

class OrderItem extends React.Component {
  constructor() {
    super()


  }

    render(){
      return (
        <li className="order__item">
          <strong>{this.props.orderItem.quantity} X {this.props.menuItem.name}</strong>
        </li>
      )
    }  
}

export default OrderItem;