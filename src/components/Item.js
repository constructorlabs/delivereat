import React from "react";

class Item extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.receiveNewQuantity(this.props.item.id, event.target.value);
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
            min="0"
          />
          <button className="display__menuItem--button">Add to Order</button>
        </label>
        <hr className="display__menuItem--hr" />
      </li>
    );
  }
}

export default Item;
