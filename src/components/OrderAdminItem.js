import React from 'react';

class OrderAdminItem extends React.Component {
  constructor(){
    super();
  }

  render(){
    return (
        <li>
          <h3>Order</h3>
          {this.props.order[0]}
        </li>
    )
    
  }
}

export default OrderAdminItem;