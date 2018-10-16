import React from 'react';
import Homepage from './Homepage'
import Basket from './Basket'
import MenuResults from './MenuResults'

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      menu: {},
      order: {},  //to add empty history of order
      
  
    }
    this.getOrder = this.getOrder.bind(this);
    // this.fetchMenu = this.fetchMenu.bind(this)
    this.sendOrder = this.sendOrder.bind(this)
    
  }

  componentDidMount(){
    this.fetchMenu()
  }

  fetchMenu(){
    fetch('/menu')
    .then(response => response.json())
    .then(body => {
      console.log(body)
      this.setState({
        menu: body,
      })
  })
}

sendOrder(){
  this.setState({
    order: {}
  })
}


  getOrder(order) {
    const matchingOrders = Array.from(this.state.order).find(newOrder => {
      return order.id === newOrder.id;
    });

    if (matchingOrders) {
      matchingOrders.quantity += order.quantity;
      matchingOrders.price += order.price;

      const ordersWithoutCurrentOrder = this.state.order.filter(
        newOrder => {
          return newOrder.id !== order.id;
        }
      );

      this.setState({
        order: ordersWithoutCurrentOrder.concat(matchingOrders)
      });
    } else {
      this.setState({
        order: [...this.state.order, order]
      });
    }
  }



  






  render(){
    return (
      <div>
        <div className='homepage-header'>
          <Homepage/>
        </div>
          <Basket   sendOrder={this.sendOrder} order={this.state.order}/>
        <MenuResults  getOrder={this.getOrder} menu={this.state.menu}/>
      </div>
    )
  }
}

export default App;
