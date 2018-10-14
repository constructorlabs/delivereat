import React from 'react';

class OrderAdminItem extends React.Component {
  constructor(){
    super();
  }

  render(){
    const orderarr = Object.keys(this.props.order);
    
    return (
        <li>
          <h3>Order</h3>
          {this.props.order[0]["menuitems"]}
        </li>
    )
    
  }
}

export default OrderAdminItem;