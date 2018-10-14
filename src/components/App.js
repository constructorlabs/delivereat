import React from 'react';
import Header from './Header'
import ConfirmationMessage from './ConfirmationMessage';
import ConfirmationOrder from './ConfirmationOrder';


import Menu from './Menu';
import Order from './Order';

import {orderTotals} from '../../common/orderTotals'

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      menu:{},
      userId:1,
      orderHistory:{},
      newOrder:{},
      whichScreen: 'ordering',
      orderConfirmation: {}
    }

    this.fetchMenu = this.fetchMenu.bind(this)
    this.receiverAddToOrder = this.receiverAddToOrder.bind(this)
    this.sendOrder = this.sendOrder.bind(this)
    this.calculateTotals = this.calculateTotals.bind(this)
  }

  componentWillMount() {
    this.fetchMenu()
  }

  fetchMenu() {
    fetch('/api/menu').
    then(response => response.json()).
      then(body => {
        this.setState({
          menu:body
        })
      })
  }


  sendOrder() {
    const orderObject = {
      items:this.state.newOrder,
      userId:this.state.userId
    }
    console.log(orderObject)
    
    fetch('http://localhost:8080/api/order', {
      method: 'post',
      body: JSON.stringify(orderObject),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      return response.json();
    }).then(data => {
      console.log(data)
      this.setState ({
        orderConfirmation:data,
        whichScreen:'confirmation'
      })
    });
  }

  receiverAddToOrder(item) {
    const order = Object.assign({}, this.state.newOrder)
      if (order[item.id]) {
        order[item.id] = {
          id: item.id,
          quantity: order[item.id].quantity + item.quantity,
        }
      } else {
        order[item.id] = {
          id: item.id,
          quantity: item.quantity,
        }
      }

      if(order[item.id].quantity < 1) {
        delete order[item.id]
      }

      this.setState({
        newOrder:order
      },()=>console.log(this.state.newOrder))
    }

  calculateTotals() {
    return orderTotals(this.state.newOrder, this.state.menu)
  }





  render(){
    return (
      <div className="wrapper">
        <Header />

        {this.state.whichScreen==='ordering' && (      
        <Menu menu={this.state.menu} receiverAddToOrder={this.receiverAddToOrder} newOrder={this.state.newOrder} />
        )}

        {this.state.whichScreen==='confirmation' && (      
        <ConfirmationMessage />
        )}

        {this.state.whichScreen==='confirmation' && (      
        <ConfirmationOrder orderConfirmation={this.state.orderConfirmation} menu={this.state.menu}  />
        )}

        
        {this.state.whichScreen==='ordering' && (
         <Order sendOrder={this.sendOrder} orderTotals={orderTotals(this.state.newOrder, this.state.menu)} newOrder={this.state.newOrder} menu={this.state.menu}/>
        )}
      </div>
    )
  }
}

export default App;
