import React from 'react';
import '../styles/MenuItem.scss';
import cx from 'classnames';

class MenuItem extends React.Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd(event) {
    const now = new Date();
    const coffee = Object.assign({},this.props.details);
    coffee.timestamp = now.valueOf();
    console.log(coffee);
    this.props.addToOrder(coffee);
  }

  handleRemove(event) {
    const coffee = Object.assign({},this.props.details);
    this.props.removeFromOrder(coffee);
  }

  render() {

    const inBasket = this.props.order.length && this.props.order.map(item => item[0].id).includes(this.props.details.id);
    const count = inBasket ? this.props.order.filter(item => item[0].id === this.props.details.id)[0][1] : 0;
    const classesWrapper = cx('menu-item', {'menu-item--in-basket': inBasket});
    const classesRemove = cx('menu-item__remove-button', {'menu-item__remove-button--in-basket': inBasket});
    const classesCount = cx('menu-item__count', {'menu-item__count--in-basket': inBasket});

    return (
      <div className={classesWrapper}>
        <div className={'menu-item__title'}>
          <div className={'menu-item__name'}>{this.props.details.name}</div>
          <div className={'menu-item__buttons'}>
            <button className={classesRemove} onClick={this.handleRemove}><i className="fas fa-minus-circle"></i></button>
            <div className={classesCount}>{count}</div>
            <button className={'menu-item__add-button'} onClick={this.handleAdd}><i className="fas fa-plus-circle"></i></button>
          </div>
        </div>
        <div className={'menu-item__description'}>{this.props.details.description}</div>
        <div className={'menu-item__price'}>{`£${this.props.details.price.toFixed(2)}`}</div>
      </div>
    );
  }
}

export default MenuItem;