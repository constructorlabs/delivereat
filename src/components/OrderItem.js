import React from 'react';

import "../styles/components/orderitem.scss";

class OrderItem extends React.Component {

    render() { 
        return ( 
            <ul className='order-breakdown'>
                <li className='item'>{this.props.item.name}</li>
                <li className='quantity'>{this.props.item.quantity}</li>
                <li className='price'>{this.props.item.orderPrice}</li>
            </ul>
         );
    }
}
 
export default OrderItem;