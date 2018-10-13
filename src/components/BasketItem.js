import React from 'react';

// class BasketItem extends React.Component {
//   constructor(props) {
//     super(props);

// this.state = {
//   quantity: 1;
// }

// this.increaseOrderAmount = this.increaseOrderAmount.bind(this);
// this.decreaseOrderAmount = this.decreaseOrderAmount.bind(this);
// }

const BasketItem = ({ orderItem, handleBasketChange, removeFromBasket }) => {
  // increaseOrderAmount() {
  //   this.setState({
  //     // quantity: this.state.quantity + 1
  //   });
  // }

  // decreaseOrderAmount() {
  //   if (this.state.quantity > 0) {
  //     this.setState({
  //       // quantity: this.state.quantity - 1
  //     });
  //   }
  // }

  // render() {
  const { id, name, price, quantity } = orderItem;

  return (
    <li className="order">
      {name} £{quantity * price}
      <button
        onClick={e => handleBasketChange(e, id)}
        className="btn btn__decrease"
        name="decrease"
      >
        [-]
      </button>
      <span className="amount__count">{quantity}</span>
      <button
        onClick={e => handleBasketChange(e, id)}
        className="btn btn__increase"
        name="increase"
      >
        [+]
      </button>
      <button onClick={removeFromBasket} className="btn btn__removeItem">
        {' '}
        Remove{' '}
      </button>
    </li>
  );
  // }
};
export default BasketItem;
