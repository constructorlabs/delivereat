import React from 'react';
import '../styles/App.scss';
import Menu from './Menu';
import MakeOrder from './MakeOrder';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      menu: [],
      currentOrder: []
    }
    this.receiveItemOrder = this.receiveItemOrder.bind(this)
    this.fetchMenu = this.fetchMenu.bind(this)
  }

  fetchMenu() {
    const api = "/api/menu/"
    fetch(api)
    .then(response => response.json())
    .then(content => {
      this.setState({menu: content})
    })
  }
  
  componentDidMount() {
   this.fetchMenu();
  }

  receiveItemOrder(order) {
    const updatedOrder = Object.assign({}, this.state.currentOrder, {[order.id]: order } )
    this.setState({currentOrder: updatedOrder}, () => console.log(this.state.currentOrder) )
  }  

  render(){
    return (
      <div>
        <Menu 
        menu={this.state.menu}
        receiveItemOrder={this.receiveItemOrder} />
        <MakeOrder 
        currentOrder={this.state.currentOrder}
        />
      </div>
    )
  }
}

export default App;
