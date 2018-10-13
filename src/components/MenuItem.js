import React from 'react'

import "../styles/menu-item.scss"

class MenuItem extends React.Component{
  constructor(){
    super()

    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state ={
      quantity: 0
    }
  }


  handleAdd(event){
    event.preventDefault()
    this.props.addToOrder(this.props.menuItem, 1)
    console.log("added")
  }

  handleChange(event){
    this.setState({
      quantity: event.target.value
    })
  }

  render(){
    return(
      <li className="menu-item">{this.props.menuItem.name}
         <span className="menu-item__price-add"> <span className="menu-item__price">£{this.props.menuItem.price}.00    </span>  
          <a href="" onClick={this.handleAdd}><i className="fas fa-plus-circle"></i></a>
        </span>
      </li>
    )
  }
}

export default MenuItem
