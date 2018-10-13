import React from "react"
import MenuItem from './MenuItem.js'

class Menu extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div className="menu">

        {Object.keys(this.props.menu).map(item => {
          return (<div key={item}>
                    <h3>{item}</h3>
                    {Object.values(this.props.menu[item]).map(item => {
                      return <MenuItem key={item.id} menuItem={item} addToOrder={this.props.addToOrder}/>
                    })}

                  </div>)



        })}

      </div>
    )
  }


}

export default Menu
