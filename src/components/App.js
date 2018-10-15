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
    this.removeOrder = this.removeOrder.bind(this);
  }


  componentDidMount() {
    this.getFetch();
  }


  getFetch() {
    const serverFetch = `http://localhost:8080/menu`

    fetch(serverFetch)
    .then(response => response.json())
    .then(content => {
      console.log("menu content",content)
      this.setState( {
        menu : content
       } )
     }
    );
  }

  addOrder(order) {
   const newTotalOrder = [...this.state.totalOrder, order];
   const newTotalPrice = Number(this.state.totalPrice) + order.price;
   console.log("newTotalPrice",newTotalPrice);
   this.setState( {
     currentOrder : order,
     totalOrder : newTotalOrder,
     totalPrice : newTotalPrice
   },this.getFetch())
  }



  removeOrder(order) {
   // console.log("order to remove",order);
   const ordersBeforeRemoving = this.state.totalOrder;
   const ordersAfterRemoving = ordersBeforeRemoving.filter( item => item.id !== order.id)
   let priceAfterRemoving = 0;

   for(let i = 0; i < ordersAfterRemoving.length; i++){
     priceAfterRemoving = priceAfterRemoving + ordersAfterRemoving[i].price
   }

   this.setState( {
     totalOrder : ordersAfterRemoving,
     totalPrice : priceAfterRemoving
   }, console.log(this.state.totalOrder) );
  }



render() {
  console.log('total order',this.state.totalOrder);
  const orderNameArray = [];

  let itemQuantity = 0;

  for(let i = 0; i < this.state.totalOrder.length; i++) {
    if(!orderNameArray.includes(this.state.totalOrder[i].name)) {
      orderNameArray.push(this.state.totalOrder[i].name);
    }

    itemQuantity = itemQuantity+this.state.totalOrder[i].quantity;
  }


  return (

    <div>
      <header><h1 className="app_shoptitle">Siopa Caca Milis!</h1></header>
      <MenuComponent
        menu={this.state.menu}
        addOrder={this.addOrder} />
        <div className="app_basket">
         <h2>Your Current Basket</h2>

         <p>Your current order consists of:</p>
         <ul>
           <li>{orderNameArray + "  "}</li>
           <li>Quantity is: {itemQuantity}</li>
           <li>Your current total: £ {this.state.totalPrice} </li>
         </ul>

         <Basket
          totalOrder={this.state.totalOrder}
          totalPrice={this.state.totalPrice}
          removeOrder={this.removeOrder} />
      </div>
    </div>

  )
}
}

export default App;
