import React from 'react';
import Menu from './Menu.js'
import Header from './Header.js'
import SeeOrder from "./SeeOrder.js"
import OrderConfirmation from "./OrderConfirmation.js"

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.getMenu = this.getMenu.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this)
    this.amendQuantity = this.amendQuantity.bind(this)
    this.changeDisplay = this.changeDisplay.bind(this)
    this.placeOrder = this.placeOrder.bind(this)

    this.state={
      menu: {},
      currentOrder: {
        total: 0,
        items: {}
                    },
      display: 'menu'  //'menu' or 'order'

    }
  }

  componentDidMount(){
    this.getMenu()
  }


  getMenu(){
    fetch('/api/menu')
      .then(response => response.json())
      .then(body => {
        this.setState({
          menu: body
        })
      })
  }

  placeOrder(){
    const order = this.state.currentOrder
    fetch('/api/order', {
      method: 'post',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(body => {
      console.log(body)
    })
  }

  addToOrder(menuItem, quantity){
    const foodItem = {
      [menuItem.id]: {
        quantity,
        totalPrice: quantity * menuItem.price,
        menuItem
      }
    }
    const currentOrder = {
      total: this.state.currentOrder.total + foodItem[menuItem.id].totalPrice,
      items: Object.assign(this.state.currentOrder.items, foodItem)
    }
    this.setState({
      currentOrder
    })
  }

  removeFromOrder(menuItem){
    const currentOrder = this.state.currentOrder
    delete currentOrder.items[menuItem.id]
    currentOrder.total = this.calculateTotal(currentOrder)

    this.setState({
      currentOrder
    })
  }

  calculateTotal(currentOrder){
    const total = Object.values(currentOrder.items).reduce((acc,item) => {
      return acc + item.totalPrice
    }, 0)
    return total
  }

  amendQuantity(menuItem, quantity){
    const currentOrder = this.state.currentOrder
    currentOrder.items[menuItem.id] = {
      menuItem,
      quantity,
      totalPrice: quantity * menuItem.price
    }
    currentOrder.total = this.calculateTotal(currentOrder)


    this.setState({
      currentOrder
    })
  }

  changeDisplay(displayType){
    this.setState({
      display: displayType
    })

  }

  render(){
    return (
      <div>
        <Header />
        {this.state.display === 'menu'
          ? <Menu menu={this.state.menu} addToOrder={this.addToOrder}/>
          : null}



        {this.state.display === 'order'
          ? (<OrderConfirmation currentOrder={this.state.currentOrder}
                                addToOrder={this.addToOrder}
                                amendQuantity={this.amendQuantity}
                                placeOrder={this.placeOrder}
                               removeFromOrder={this.removeFromOrder}/>)
          : null}

        {Object.values(this.state.currentOrder.items).length > 0 && this.state.display === 'menu'
         ? <SeeOrder changeDisplay={this.changeDisplay}/>
         : null}

      </div>
    )
  }
}

export default App;
