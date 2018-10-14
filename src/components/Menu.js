import React from "react";
import MenuItem from './MenuItem'

import "../styles/Menu.scss";

class Menu extends React.Component {
  constructor() {
    super()
  }



    render(){
      return (

        <ul className="menu">
            {Object.values(this.props.menu).map(menuItem => {
                return <MenuItem menuItem={menuItem} key={menuItem.id} receiverAddToOrder={this.props.receiverAddToOrder} quantity={!this.props.newOrder[menuItem.id]?0:this.props.newOrder[menuItem.id].quantity} />
            })}
        </ul>
      )
    }  
}

export default Menu;