import React from 'react';

class Order extends React.Component {
  constructor(){
    super();

    this.state= {
    }

    this.handleClick=this.handleClick.bind(this);
    this.handleClick2=this.handleClick2.bind(this);
  }

handleClick(){
  this.props.receiveOrderSubmit();
}

handleClick2(id){
  this.props.receiveRemoveItem(id);
}

  render(){
    return(
      <div>
        <h3>Your Order Basket</h3>
        <div>
          {Object.entries(this.props.order).map (([id, quantity]) => {
            const menuItem = this.props.menu.find(item => item.id.toString() === id)
            return(
              <div data-id={id}>
                {quantity}x {id} x {menuItem.name} x £{menuItem.price}
                <button
                  data-id={id}
                  key={menuItem.id}
                  receiveRemoveItem={this.props.receiveRemoveItem}
                  onClick={event => this.handleClick2(id)}>Remove Item</button>
              </div>
            )
          })}
        </div>
        <div>
          <button onClick={this.handleClick} >Submit</button>
        </div>
        <div>
          <button onClick={this.handleClick} >Submit</button>
        </div>
      </div>
    )
  }
}

export default Order
