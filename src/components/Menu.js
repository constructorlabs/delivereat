import React from "react"
import MenuItem from './MenuItem.js'

class Menu extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div className="menu">
        {Object.values(this.props.menu).map(item => {
          return <MenuItem key={item.id} menuItem={item} addToOrder={this.props.addToOrder} />
        })}

      </div>
    )
  }


}

export default Menu
