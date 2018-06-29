import React from "react";

class Item extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const quantity = event.target.value;
    this.setState({
      quantity
    });
    this.props.receiveNewQuantity(this.props.item.id, quantity);
  }

  render() {
    return (
      <li className="display__menuItem">
        <h3 className="display__menuItem--title">{this.props.item.name}</h3>
        <p className="display__menuItem--subtitle">£{this.props.item.price}</p>

        <label className="display__menutItem--label">
          Order
          <input
            className="display__menuItem--input"
            type="number"
            step="1"
            onChange={this.handleChange}
            value={this.state.quantity}
          />
          <button className="display__menuItem--button">Add to Order</button>
        </label>

        <hr className="display__menuItem--hr" />
      </li>
    );
  }
}

export default Item;
