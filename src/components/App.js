import React from 'react';
import Homepage from './Homepage'
import MenuResults from './MenuResults'
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      menu: {},
      order: {},
      orders: ''
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
        <Homepage/>
        <MenuResults fetchOrder={this.fetchOrder} menu={this.state.menu}/>
      </div>
    )
  }
}

export default App;
