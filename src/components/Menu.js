import React from 'react';
import Food from './Food';
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
            <Food food={item} order={this.props.order} receiveAddClick={this.props.receiveAddClick}
              receiveRemoveClick={this.props.receiveRemoveClick}
            />
            )
          })
          }
        </div>
      )}
}
export default Menu;
