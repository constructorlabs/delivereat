import React from "react";

import "../styles/components/item.scss";

class Item extends React.Component {
  constructor() {
    super();

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleLessClick = this.handleLessClick.bind(this);
  }

  handleAddClick() {
      this.props.addToOrder(this.props.item);
  }

  handleLessClick() {
      this.props.removeFromOrder(this.props.item);
  }

  render() {
    return (
      <li className='listItem'>
        <p className='name'>{this.props.item.name}</p>
        <i onClick={this.handleAddClick} className="far plus fa-plus-square" />
        <i onClick={this.handleLessClick} className="far minus fa-minus-square" />
        <p className='cost'>{this.props.item.price}</p>
        <img src={this.props.item.img} />
      </li>
    );
  }
}

export default Item;
