import React from 'react';
import Splash from './Splash';
import Menu from './Menu';
import Basket from './Basket';
import Checkout from './Checkout';
import '../styles/App.scss';

class App extends React.Component {

  constructor(){

    super();

    this.state = {stage: 'splash',
                  menu: '',
                  order: {
                    contents: [],
                    total: 0 }};

    this.addToOrder = this.addToOrder.bind(this); 
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.checkout = this.checkout.bind(this);
    this.changeStage = this.changeStage.bind(this);
  }

  componentDidMount() {
    fetch('/menu')
    .then(response => response.json())
    .then(menu => this.setState({menu}));
  }

  changeStage(stage) {
    this.setState({stage});
  }

  calculateTotal(order) {
    const menu = this.state.menu;
    const total = (order.length) ? order
    .map(orderItem => menu.find(menuItem => menuItem.id === orderItem[0]).price * orderItem[1])
    .reduce((a,b) => (a+b)) : 0;
    return total;
  }

  addToOrder(menuItemId) {
    let contents = this.state.order.contents;
    if (contents.length === 0) {
      contents = [[menuItemId, 1]];
    } else if (!contents.map(item => item[0]).includes(menuItemId)) {
      contents.push([menuItemId,1]);
    } else {
      contents = contents.map(item => {
        if (item[0] === menuItemId) {
          return [item[0],item[1] + 1];
        } else {
          return item;
        }})}
    const total = this.calculateTotal(contents);
    this.setState({order: {
                    contents,
                    total }});
  }

  removeFromOrder(menuItemId) {
    const contents = this.state.order.contents
    .map(item => {
      if (item[0] === menuItemId) {
        return [item[0], item[1] - 1];
      } else {
        return item;
      }})
    .filter(item => item[1] !== 0);
    if (!contents.length) {
      this.setState({stage: 'menu'});
    }
    const total = this.calculateTotal(contents);
    this.setState({order: {
                    contents,
                    total }});
  }

  checkout() {
    fetch('/orders', {
      method: 'POST',
      body: JSON.stringify(this.state.order.contents),
      headers: {'Content-Type': 'application/json'}})
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));

    this.setState({ stage: 'checkout',
                    order: {
                      contents: [],
                      total: 0} });
  }

  render() {
    const stage = this.state.stage;

    return (
      <div className='app'>
        {(stage === 'splash') && 
        <Splash 
          changeStage={this.changeStage}/>}
        {(stage === 'menu' || stage === 'basket') &&
        <div className='main'>
          <div className='header'>
            <p className='header__logo'>Zing</p>
          </div>
          <div className='content'>
            {(this.state.menu) && 
            <Menu 
              stage={stage} 
              order={this.state.order} 
              menu={this.state.menu} 
              addToOrder={this.addToOrder} 
              removeFromOrder={this.removeFromOrder}/>}
            {(!!this.state.order.contents.length) && 
            <Basket 
              stage={stage}
              menu={this.state.menu} 
              changeStage={this.changeStage} 
              order={this.state.order} 
              addToOrder={this.addToOrder} 
              removeFromOrder={this.removeFromOrder} 
              checkout={this.checkout}/>}
          </div>
        </div>}
        {(stage === 'checkout') && 
        <Checkout 
          changeStage={this.changeStage}/>}
      </div>
    );
  }
}

export default App;