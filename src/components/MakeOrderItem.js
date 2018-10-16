import React from 'react';
import '../styles/components/makeorderitem.scss';

class MakeOrderItem extends React.Component {
  constructor(){
    super();
  }

  render(){

    const pricedisplay = this.props.currentorderitem.price.toFixed(2);

    return (
      <li>
        <span>{this.props.currentorderitem.quantity}</span> * <strong>{this.props.currentorderitem.item}</strong> : &pound;{pricedisplay}
      </li>
    )
  }
}

export default MakeOrderItem;
