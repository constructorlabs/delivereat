import React from 'react';
import Food from './Food';

class Menu extends React.Component{
  constructor(){
    super();


  }





  render(){
    return(
        <div>
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
