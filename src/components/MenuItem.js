import React from 'react';
import '../styles/components/menuitem.scss';
import cx from 'classnames';

class MenuItem extends React.Component {
  constructor(){
    super();

    this.state = {
      menuitemQuantity: 1,
      added: false
    };

    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.itemOrder = this.itemOrder.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.added === false) {
    this.itemOrder();
    this.setState({
      added: !this.state.added
     });
    } else {
      this.props.removeItemOrder(this.props.menuitem.id);
      this.setState({
        added: !this.state.added
       });
    }
  }


  handleClick(event) {
    if (event.target.value === "-" && this.state.menuitemQuantity > 0) {
      this.setState({
        menuitemQuantity: this.state.menuitemQuantity - 1
      });
    } else if (event.target.value === "+") {
      this.setState({
        menuitemQuantity: this.state.menuitemQuantity + 1
      });
    }
  }

  itemOrder() {
    let price = (this.props.menuitem.price * this.state.menuitemQuantity);
    const order = {
      id: this.props.menuitem.id,
      item: this.props.menuitem.name,
      price: price,
      quantity: this.state.menuitemQuantity,
    };
    this.props.receiveItemOrder(order);
  }

  render(){

    const buttonclasses = cx('menuitem__submit', {
      'added': this.state.added,
      '': !this.state.added
    });
    
    const pricedisplay = this.props.menuitem.price.toFixed(2);

    return (
      <li className="menuitem">
          <form className="menuitem__form" onSubmit={this.handleSubmit}>
            <div className="menuitem__details">
              <div className="menuitem__select">
                <label className="menuitem__item">{this.props.menuitem.name}</label>
                <button type="submit" className={buttonclasses}></button>
              </div>  
              <div className="menuitem__price">£{pricedisplay}</div>
            </div>

            <div className="quantity">
              <input className="quantity__change" onClick={this.handleClick} value="-" type="button"/>
              <input className="quantity__display" type="text" size='1' value={this.state.menuitemQuantity} readOnly/>
              <input className="quantity__change" onClick={this.handleClick} value="+" type="button"/>
            </div>
        </form>
      </li>
    )
  }
}

export default MenuItem;
