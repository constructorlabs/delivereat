import React from "react"

class OrderItem extends React.Component{
  constructor(){
    super()

    this.handleRemove = this.handleRemove.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleRemove(event){
    event.preventDefault()
    this.props.removeFromOrder(this.props.item.menuItem)

  }

  handleChange(event){
    event.preventDefault()
    this.props.amendQuantity(this.props.item.menuItem, event.target.value)

  }

  render(){
    return (
      <div>
        <span>{this.props.item.menuItem.name}</span>
        <input onChange={this.handleChange} type="number" name="quantity" placeholder={this.props.item.quantity} min="1" max="5" />
        <span>{this.props.item.totalPrice}</span>
        <button onClick={this.handleRemove}>Remove</button>
      </div>

    )
  }
}

export default OrderItem
