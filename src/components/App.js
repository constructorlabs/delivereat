import React from 'react';
import WelcomeHeading from './WelcomeHeading'
import Basket from './Basket'
import MenuResults from './MenuResults'

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      menu: {},
      order: {},
  
    }
    this.fetchMenu = this.fetchMenu.bind(this)
    this.fetchOrder = this.fetchOrder.bind(this)
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
        menu: body
      })
  })
}

  fetchOrder(order){
    fetch('/order', {
    method: 'post',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json'
    }})
  .then(response => response.json())
  .then(data => {
    this.setState({
      order: {},
      orders: data
    })
  });
  }


  render(){
    return (
      <div>
        <div className='welcome-header'>
          <WelcomeHeading/>
        </div>
        <Basket  fetchOrder={this.fetchOrder} order={this.state.order}/>
        <MenuResults  menu={this.state.menu}/>
      </div>
    )
  }
}

export default App;
