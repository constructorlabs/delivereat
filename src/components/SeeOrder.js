import React from 'react'

import '../styles/SeeOrder.scss';

class SeeOrder extends React.Component{
  constructor(){
    super()

    this.handleSeeOrder = this.handleSeeOrder.bind(this)
  }

  handleSeeOrder(){
    event.preventDefault()
    this.props.changeDisplay('order')
  }


  render(){
    return(
      <div className="footer">
        <span>Current Total: £{this.props.currentTotal}.00 </span>
        <button onClick={this.handleSeeOrder} className="footer__see-order-btn">See Order</button>
      </div>
    )
  }
}
 export default SeeOrder
