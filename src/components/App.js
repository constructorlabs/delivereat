import React from 'react';
import Splash from './Splash';
import Menu from './Menu';
import Basket from './Basket';

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();
    this.state = {stage: 'splash',
                  menu: '',
                  beans: '',
                  order: {
                    contents: [],
                    total: 0 }};
    this.addToOrder = this.addToOrder.bind(this); 
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.checkout = this.checkout.bind(this);
    this.changeStage = this.changeStage.bind(this);
  }

  componentDidMount() {

    fetch('http://localhost:8080/API/menu')
    .then(response => response.json())
    .then(menu => this.setState({menu}));

    fetch('http://localhost:8080/API/beans')
    .then(response => response.json())
    .then(beans => this.setState({beans}));

  }

  changeStage(stage) {
    this.setState({stage});
  }

  addToOrder(coffee) {
    let contents = this.state.order.contents;
    if (contents.length === 0) {
      contents = [[coffee, 1]];
    } 
    else if (!contents.map(item => item[0].id).includes(coffee.id)) {
      contents.push([coffee,1]);
    }
    else {
      contents = contents.map(item => {
        if (item[0].id === coffee.id) {
          return [item[0],item[1] + 1];
        }
        else {
          return item;
        }
      })
    }
    const total = contents.map(item => item[0].price * item[1]).reduce((a,b)=>(a+b));
    this.setState({order: {
                    contents,
                    total }});
  }

  removeFromOrder(coffee) {
    const contents = this.state.order.contents
    .map(item => {
      if (item[0].id === coffee.id) {
        return [item[0], item[1] - 1];
      } else {
        return item;
      }
    })
    .filter(item => item[1] !== 0);
    const total = (contents.length) ? contents.map(item => item[0].price * item[1]).reduce((a,b)=>(a+b)) : 0;
    this.setState({order: {
                    contents,
                    total }});
  }

  checkout() {
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

  render() {

    return (
      <div className='app'>
        {(this.state.stage === 'splash') && <Splash changeStage={this.changeStage}/>}
        {(this.state.stage === 'menu' || this.state.stage === 'basket') &&
        <div className='main'>
          <div className='header'>
            <img className='header__image' src="/static/assets/header.jpg"></img>
            <p className='header__logo'>Zing</p>
          </div>
          <div className='content'>
            {(this.state.menu) && <Menu stage={this.state.stage} order={this.state.order.contents} menu={this.state.menu} addToOrder={this.addToOrder} removeFromOrder={this.removeFromOrder}/>}
            {(!!this.state.order.contents.length) && <Basket changeStage={this.changeStage} order={this.state.order} addToOrder={this.addToOrder} removeFromOrder={this.removeFromOrder} checkout={this.checkout}/>}
          </div>
        </div>}
      </div>
    );
  }
}

export default App;