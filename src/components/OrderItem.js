import React from 'react';
import '../styles/App.scss';

class OrderItem extends React.Component {
  constructor(){
    super();


  }

  render(){

    return (
      <li>
        <p>{this.props.currentorderitem.id}</p>
        <p>{this.props.currentorderitem.item}</p>
        <p>{this.props.currentorderitem.price}</p>
        <p>{this.props.currentorderitem.quantity}</p>
      </li>
    )
  }
}

export default OrderItem;
