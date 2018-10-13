import React from 'react';
import MenuComponent from "./MenuComponent";
import Basket from './Basket';

import '../styles/App.scss';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu : [],
      currentOrder: [],
      totalOrder: [],
      totalPrice: 0,
      showOrder: false
    };
    this.getFetch = this.getFetch.bind(this);
    this.addOrder = this.addOrder.bind(this);
  }


  componentDidMount() {
    this.getFetch();
  }


  getFetch() {
    const serverFetch = `http://localhost:8080/menu`

    fetch(serverFetch)
    .then(response => response.json())
    .then(content => {
      this.setState( {
        menu : content
       } )
     }
    );
  }

  addOrder(order) {
   const newTotalOrder = [...this.state.totalOrder, order];
   const newTotalPrice = this.state.totalPrice + order.price;
   this.setState( {
     currentOrder : order,
     totalOrder : newTotalOrder,
     totalPrice : newTotalPrice
   } )
  }


  removeOrder(order) {
   const ordersBeforeRemoving = this.state.totalOrder;
   const ordersAfterRemoving = ordersBeforeRemoving.filter( item => item !== order)
   console.log(ordersAfterRemoving);
    /* return true or false here ─ true to keep the item, false to remove it */
  }



render() {

  return (

    <div>
      <header><h1>Siopa Caca Milis!</h1></header>
      <MenuComponent
        menu={this.state.menu}
        addOrder={this.addOrder} />
      <Basket totalOrder={this.state.totalOrder}
        removeOrder={this.removeOrder}  />

    </div>

  )
}
}

export default App;
