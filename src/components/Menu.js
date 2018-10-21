import React from "react";
import MenuItem from './MenuItem'

import "../styles/Menu.scss";

function Menu({menu,receiverAddToOrder,newOrder}) {
      return (
        <ul className="menu">
            {Object.values(menu).map(menuItem => {
                return <MenuItem menuItem={menuItem} key={menuItem.id} receiverAddToOrder={receiverAddToOrder} quantity={!newOrder[menuItem.id]?0:newOrder[menuItem.id].quantity} />
            })}
        </ul>
      )
    }  

export default Menu;