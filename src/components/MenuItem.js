import React from 'react'


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
    this.props.addToOrder(this.props.menuItem, this.state.quantity)
    console.log("added")
  }

  handleChange(event){
    this.setState({
      quantity: event.target.value
    })
  }

  render(){
    return(
      <li>{this.props.menuItem.name} price: £{this.props.menuItem.price}
        <button onClick={this.handleAdd}>Add to order</button>
        <form>
        <input onChange={this.handleChange} type="number" name="quantity" min="1" max="5" />
      </form>
      </li>
    )
  }
}

export default MenuItem
