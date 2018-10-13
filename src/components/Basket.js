import React from 'react';

class Basket extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.props.removeOrder = this.props.removeOrder.bind(this);
  }

  handleClick(event) {
   const itemRemove = event.target;
   this.props.removeOrder(itemRemove);
  }


  render() {
    return(
      <div>
       <h2>Your Current Basket</h2>
        {/* {this.props.totalOrder.name}{this.props.totalOrder.price}{this.props.totalOrder.quantity} */}
       <button onClick={this.handleClick}>Remove An Item</button>
      </div>

    );
  }
}
export default Basket;
