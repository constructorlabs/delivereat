import React from 'react';
import Food from './Food';
import Order from './Order';
import "../styles/Menu.scss";

class Menu extends React.Component{
  constructor(){
    super();


  }





  render(){
    return(
        <div className="menu">

          {this.props.menu.map(item => {
            return (
            <Food food={item} order={this.props.order} className="food" receiveAddClick={this.props.receiveAddClick}
              receiveRemoveClick={this.props.receiveRemoveClick}
            />
            )
          })
          }

          <div className="orders">
            <Order
              order={this.props.order}
              receiveClickPlus={this.props.receiveClickPlus}
              receiveClickMinus={this.props.receiveClickMinus}
              receiveOrderSubmit={this.props.receiveOrderSubmit}
            />
          </div>
        </div>
      )}
}
export default Menu;
