import React from 'react';
import Menu from './Menu';

import "../styles/components/app.scss";


class App extends React.Component {
  constructor(){
    super();

    this.state = {
      menuArr: [],
      item: {},
      order: {}
    }

    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
  }

  componentDidMount(){
    fetch('api/menu')
    .then(response => response.json())
    .then(body=>this.setState({menuArr:body}))
  }

  addToOrder(item){
    let orderItem;

    if(this.state.order[item.id]){
      orderItem = Object.assign({}, this.state.order[item.id]);
      const itemsQuantity = orderItem.quantity + 1;
      const itemsPrice = orderItem.price * itemsQuantity;
      orderItem.quantity = itemsQuantity;
      orderItem.orderPrice = itemsPrice;
      
    } else{
        orderItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        orderPrice: item.price
      }
    
    }
    const newOrder = Object.assign({}, this.state.order);
    newOrder[item.id] = orderItem
    this.setState({
      order: newOrder
    }, () => console.log(this.state.order));
  }

  removeFromOrder(item){
    let orderItem;
    const newOrder = Object.assign({}, this.state.order);

    if(this.state.order[item.id]){
      orderItem = Object.assign({}, this.state.order[item.id]);
      const itemsQuantity = orderItem.quantity - 1;
        if (itemsQuantity === 0) {
          delete newOrder[item.id];
        } else{
          const itemsPrice = orderItem.price * itemsQuantity;
          orderItem.quantity = itemsQuantity;
          orderItem.orderPrice = itemsPrice;
          newOrder[item.id] = orderItem
        }
    } 
    this.setState({
      order: newOrder
    }, () => console.log(this.state.order));
  }

  render(){
    return (
      <div>
        <button>Feed Me!</button>
        <Menu menuArr={this.state.menuArr} addToOrder={this.addToOrder} removeFromOrder={this.removeFromOrder} />

      </div>
    )
  }
}

export default App;
