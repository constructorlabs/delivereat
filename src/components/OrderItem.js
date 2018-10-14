import React from "react";

import "../styles/App.scss";

class OrderItem extends React.Component {
  constructor() {
    super()


  }



    render(){
      return (
        <li>
          {this.props.orderItem.id} {this.props.orderItem.quantity}
          {this.props.menuItem.name}
        </li>
      )
    }  
}

export default OrderItem;