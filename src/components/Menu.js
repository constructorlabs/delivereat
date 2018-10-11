import React from 'react';
import { ENGINE_METHOD_DIGESTS } from 'constants';

class Menu extends React.Component {
  constructor(props) {
    super();
    this.handleClickplus = this.handleClickplus.bind(this);
    this.handleClickminus = this.handleClickminus.bind(this);
  }

  handleClickplus(event) {
    event.preventDefault();
    const id = this.props.info.id;
    this.props.orderReceiverplus(id);
  }

  handleClickminus(event) {
    event.preventDefault();
    const id = this.props.info.id;
    this.props.orderReceiverminus(id);
  }

  render() {
    return (
      <div className="itemMenu">
        <img className="img" src={this.props.info.img} alt="" />
        <p>{this.props.info.name}</p>
        <div className="buttons">
          <button onClick={this.handleClickminus}>-</button>
          <p>Price: £{this.props.info.price}</p>
          <button onClick={this.handleClickplus}>+</button>
        </div>
      </div>
    );
  }
}

export default Menu;
