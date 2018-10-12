import React from 'react';
import '../styles/MenuItem.scss';

class MenuItem extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const now = new Date();
    const coffee = Object.assign({},this.props.details);
    coffee.timestamp = now.valueOf();
    console.log(coffee);
    this.props.addToOrder(coffee);
  }

  render() {
    return (
      <div className={'menu-item'}>
        <div className={'menu-item__name'}>{this.props.details.name}</div>
        <div className={'menu-item__description'}>{this.props.details.description}</div>
        <div className={'menu-item__price'}>{`£${this.props.details.price.toFixed(2)}`}</div>
        <button className={'menu-item__button'} onClick={this.handleClick}>Add to order</button>
      </div>
    );
  }
}

export default MenuItem;