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
        <hr />
        <div className="display__left-col">
          <h3 className="display__menuItem--title">{this.props.item.name}</h3>
          <p className="display__menuItem--subtitle">
            £{this.props.item.price}
          </p>
          <p>{this.props.item.desc}</p>

          <label className="display__menutItem--label">
            Order
            <input
              className="display__menuItem--input"
              type="number"
              step="1"
              onChange={this.handleChange}
              min="0"
              value={this.props.quantity}
            />
          </label>
        </div>
        <div className="display__right-col">
          <img src={this.props.item.img} className="display__menuItem--img" />
        </div>
      </li>
    );
  }
}

export default Item;
