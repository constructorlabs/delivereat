import React from 'react';
import '../styles/App.scss';

class MenuItem extends React.Component {
  constructor(){
    super();

    this.state = {
      menuitemQuantity: 0,
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.itemOrder = this.itemOrder.bind(this)
  }

  handleChange(event) {
    const itemQuantity = event.target.value;
      if (itemQuantity < 0) {
        alert("DO NOT DO THIS");
       } else {
        this.setState({
          menuitemQuantity: itemQuantity
        });
      }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.itemOrder();
    
  }

  itemOrder() {
    let price = this.props.menuitem.price * this.state.menuitemQuantity;
    const order = {
      id: this.props.menuitem.id,
      item: this.props.menuitem.name,
      price: price,
      quantity: this.state.menuitemQuantity,
    };
    this.props.receiveItemOrder(order);
  }

  render(){

    return (
      <li>No. {this.props.menuitem.id} &mdash; {this.props.menuitem.name} &mdash; 
         £{this.props.menuitem.price}
        {/* <figure><img src={this.props.menuitem.image} /></figure>  */}
        <form onSubmit={this.handleSubmit}>
          <label>Enter Quantity</label>
          <input onChange={this.handleChange} type="number" value={this.state.menuitemQuantity}></input>
          <button>Add Menu Item to Order</button>
          {/* <p className="error__handler">You haven't added anything</p>  */}
        </form>
      </li>
    )
  }
}

export default MenuItem;
