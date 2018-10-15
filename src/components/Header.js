import React from "react"

import "../styles/Header.scss";

class Header extends React.Component{
  constructor(){
    super()


    this.handleDisplay = this.handleDisplay.bind(this)
  }

  handleDisplay(event){
    event.preventDefault()
    this.props.changeDisplay('menu')
  }

  render(){
    return (
      <header onClick={this.handleDisplay} className="header"><h1>DeliverEat</h1></header>
    )
  }


}

export default Header
