import React from 'react';

class OrderAdminItem extends React.Component {
  constructor(){
    super();
  }

  render(){
    const test = this.props;
    console.log("props", {test})
    // console.log(this.props.order["15"])
    return (
        <li>
          <h3>Order</h3>
          {this.props.order[0]}
        </li>
    )
    
  }
}

export default OrderAdminItem;