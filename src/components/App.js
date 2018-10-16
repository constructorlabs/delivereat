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
      currentOrder: [],
      orders: []
    }
    this.receiveItemOrder = this.receiveItemOrder.bind(this)
    this.removeItemOrder = this.removeItemOrder.bind(this)
    this.fetchMenu = this.fetchMenu.bind(this)
    this.receiveOrderAdmin = this.receiveOrderAdmin.bind(this)
    this.fetchOrders = this.fetchOrders.bind(this)
    this.sendOrderToApi = this.sendOrderToApi.bind(this)
  }

  fetchMenu() {
    const api = "/api/menu/"
    fetch(api)
    .then(response => response.json())
    .then(content => {
      this.setState({menu: content});
    })
  }
  fetchOrders() {
    const api = "/api/orders/"
    fetch(api)
      .then(response => response.json())
      .then(content => {
        this.setState({orders: content})
      })
  }

  sendOrderToApi() {
    fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(this.state.currentOrder),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(order => {
        alert(`We are making stuff for you! Your order ID is ${order.orderid}`)
      });
  }

  componentDidMount() {
   this.fetchMenu();
   this.fetchOrders();
   }

  receiveItemOrder(order) {
    const updatedOrder = Object.assign({}, this.state.currentOrder, { [order.id]: order } )
    this.setState({currentOrder: updatedOrder})
  } 
  removeItemOrder(id) {
    const array = [...this.state.currentOrder];
    let index = array.indexOf(id);
    array.splice(index, 1);
    this.setState({currentOrder: array});
  }  
  receiveOrderAdmin() {
    this.setState({orders : orders})
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

          <Menu 
          menu={this.state.menu}
          receiveItemOrder={this.receiveItemOrder} 
          removeItemOrder={this.removeItemOrder} 
          />
          
          <MakeOrder 
          menu={this.state.menu}
          currentOrder={this.state.currentOrder}
          sendOrderToApi={this.sendOrderToApi}
          />
  
          <OrderAdmin 
          orders={this.state.orders}
          receiveOrderAdmin={this.receiveOrderAdmin}
          />  

        </main>
      </div>
    )
  }
}

export default App;
