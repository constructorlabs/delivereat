import React from "react";

import '../styles/MenuItem.scss';

class MenuItem extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)

    this.state = {
        quantity: 1
    }
  }

  handleClick(quantity) {
    this.props.receiverAddToOrder({id:this.props.menuItem.id, quantity:quantity==='add'?1:-1})
    console.log(`quanityt = ${this.props.quantity}`)
}

    render(){
      return (
        <li className="menu__item">
          <div className="menu__name">{this.props.menuItem.name}</div>
          <div className="menu__ingredients">{this.props.menuItem.ingredients}</div>
          <div className="menu__price">£ {this.props.menuItem.price}</div>
          <div className="menu__down"><button className="search-more__button" onClick={(e)=> this.handleClick('remove', e)}>-</button></div>
          <div className="menu__up"><button className="search-more__button" onClick={(e)=> this.handleClick('add',e)}>+</button></div>
          <div className="menu__quantity">{this.props.quantity}</div>
        </li>
      )
    }  
}

export default MenuItem;