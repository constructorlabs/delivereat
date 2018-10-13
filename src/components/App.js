import React from 'react';
// import '../styles/App.scss';
import Menu from './Menu';
import MakeOrder from './MakeOrder';
import OrderAdmin from './OrderAdmin';

import '../styles/base/base.scss';
import '../styles/components/app.scss';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      menu: [],
      currentOrder: []
    }
    this.receiveItemOrder = this.receiveItemOrder.bind(this)
    this.removeItemOrder = this.removeItemOrder.bind(this)
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
  
  removeItemOrder(id) {
    const array = [...this.state.currentOrder];
    let index = array.indexOf(id);
    array.splice(index, 1);
    this.setState({currentOrder: array});
  }  

  render(){
    return (
      <div className="app container">
        <header className="masthead">
          <h1 className="masthead__title">Cullercoats Coffee</h1>
          <div className="masthead__description">
            <p>Where good coffee and grub meets geordie banter, run by brummie Matt. Down-to-earth fare, NOW any time, any where (in the North East).</p>
          </div>
        </header>

        <main className="maincontent">
          {/* <OrderAdmin 
          currentOrder={this.state.currentOrder}
          />         */}
          <Menu 
          menu={this.state.menu}
          receiveItemOrder={this.receiveItemOrder} 
          removeItemOrder={this.removeItemOrder} 
          />
          
          <MakeOrder 
          currentOrder={this.state.currentOrder}
          />
        </main>
      </div>
    )
  }
}

export default App;
