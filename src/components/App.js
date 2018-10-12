import React from 'react';
import Menu from './Menu';
import Basket from './Basket';

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();
    this.state = {menu: '',
                  beans: '',
                  order: {
                    contents: '',
                    total: 0 }};
    this.addToOrder = this.addToOrder.bind(this); 
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
  }

  componentDidMount() {

    fetch('http://localhost:8080/API/menu')
    .then(response => response.json())
    .then(menu => this.setState({menu}));

    fetch('http://localhost:8080/API/beans')
    .then(response => response.json())
    .then(beans => this.setState({beans}));

  }

  addToOrder(coffee) {
    const orderContents = (this.state.order.contents === '') ? [coffee] : this.state.order.contents.concat(coffee);
    this.setState({order: {
                    contents: orderContents,
                    total: this.state.order.total + coffee.price }});
    console.log(orderContents);
  }

  removeFromOrder(coffee) {
    const orderContents = this.state.order.contents.filter(item => item.timestamp !== coffee.timestamp);
    this.setState({order: {
                    contents: orderContents,
                    total: this.state.order.total - coffee.price }});
  }

//NEW ORDER:
//[{"drinkId": 1, "extraShot": false, "nonDairy": "none"},{"drinkId": 2, "extraShot": true, "nonDairy": "none"}]

  submitOrder() {
    fetch('http://localhost:8080/API/order', {
      method: 'POST',
      body: JSON.stringify(this.state.order.contents),
      headers: {'Content-Type': 'application/json'}})
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));

    this.setState({ order: {
                      contents: '',
                      total: 0} });
  }

  render(){
    return (
      <div className='main'>
        <div className='header'>
          <img className='header__image' src="/static/assets/header.jpg"></img>
          <p className='header__logo'>Zing</p>
        </div>
        <div className='content'>
          {(this.state.order.contents) && <Basket order={this.state.order} removeFromOrder={this.removeFromOrder} submitOrder={this.submitOrder}/>}
          {(this.state.menu) && <Menu menu={this.state.menu} addToOrder={this.addToOrder}/>}
        </div>
      </div>
    )}
}

export default App;