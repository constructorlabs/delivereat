import React from 'react';

class OrderAdminItem extends React.Component {
  constructor(){
    super();
  }

  render(){

    return (
        <li>
            Order ID: <span>New Order</span>
            <button>Update order status</button>
        </li>
    )
  }
}

export default OrderAdminItem;