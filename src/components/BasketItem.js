import React from 'react';
import '../styles/BasketItem.scss';

class BasketItem extends React.Component {
  constructor() {
    super();
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(event) {
    this.props.addToOrder(this.props.data[0]);
  }
  
  handleRemove(event) {
    this.props.removeFromOrder(this.props.data[0]);
  }

  render() {
    
    return (
      <div className={'basket-item'}>
        <div className={'basket-item__title'}>
          <div className={'basket-item__name'}>{`${this.props.data[0].name}`}</div>
          <div className={'basket-item__buttons'}>
            <button className={'basket-item__remove-button'} onClick={this.handleRemove}><i className="fas fa-minus-circle"></i></button>
            <div className={'basket-item__count'}>{this.props.data[1]}</div>
            <button className={'basket-item__add-button'} onClick={this.handleAdd}><i className="fas fa-plus-circle"></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default BasketItem;