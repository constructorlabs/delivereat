import React from 'react';
import Menu from './Menu';
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchAllOrders = this.fetchAllOrders.bind(this);
    this.receiveHandleChange = this.receiveHandleChange.bind(this);
    this.receiveGetCurrency = this.receiveGetCurrency.bind(this);
    this.displayCurrentOrder = this.displayCurrentOrder.bind(this);
    this.displayAllOrders = this.displayAllOrders.bind(this);

    this.state = { 
      menu: {},
      currentOrder: null,
      orders: null
    }
  }

/* get menu data
///////////////////////////////////////////*/

  componentDidMount () {
    fetch("/api/menu")
    .then(response => response.json())
    .then(menu => {
      this.setState({ menu })
    })
  }


/* post current order from basket
///////////////////////////////////////////*/

  handleSubmit (event) {
    event.preventDefault();

    const currentOrder = Object.assign({}, this.state.currentOrder, { username: event.target.username.value, telephone: event.target.telephone.value });
    this.setState({ currentOrder });

    fetch('/api/order', {
      method: 'post',
      body: JSON.stringify(this.state.currentOrder),
      headers: { 'Content-Type': 'application/json' }
    }
    ).then(response => response.json()
    ).then(order => {
      this.fetchAllOrders();
    });

    Object.values(event.target).forEach(item => {
      if (item.type === "text") { 
        item.value = ""; 
      }
    });
  }

/* get all orders
///////////////////////////////////////////*/

  fetchAllOrders () {
    fetch('/api/order')
    .then(response => response.json())
    .then(orders => {
      this.setState({ 
        orders: orders,
        currentOrder: null,
        formData: null
       })
    });
  }

/* add item to basket for current order
///////////////////////////////////////////*/

  receiveHandleChange (id, event) {
    let currentOrder;
    if (event.target.value === "0") {
      currentOrder = Object.assign({}, this.state.currentOrder);
      delete currentOrder[id];
    } else {
      currentOrder = Object.assign({}, this.state.currentOrder, { [id]: {"menuId": id, "quantity": Number(event.target.value) }})
    }
    this.setState({ currentOrder });
  }

/* display prices as GBPs
///////////////////////////////////////////*/

  receiveGetCurrency (string) {
    return string.toLocaleString("en-GB", {
      style: "currency", 
      currency: "GBP"
    });
  }

/* display current order in basket
///////////////////////////////////////////*/

  displayCurrentOrder () {
    let total = 0;
    const values = Object.values(this.state.currentOrder);
    if (values.length === 0) { 
      this.setState({ currentOrder: null });
      return;
    }
    // console.log("currentOrder: ", this.state.currentOrder)
    
    return <div>
    { values.map(orderItem => {
        // console.log(values, orderItem, orderItem.menuId, orderItem.quantity);
        const menuItem = this.state.menu[orderItem.menuId];
        total += orderItem.quantity * menuItem.price;
        return <div key={"current-order-" + orderItem.menuId}>{orderItem.quantity} x {menuItem.name} = {this.receiveGetCurrency(orderItem.quantity * menuItem.price)}</div>
      })} 
      <hr className="box"></hr>
      <div>Total: {this.receiveGetCurrency(total)}</div>
    </div>
  }

/* display all orders
///////////////////////////////////////////*/

  displayAllOrders () {
    let total = 0;
    const values = Object.values(this.state.orders);
    return <div>
    { values.map((order, index) => {
      const summary = Object.values(order).map(orderItem => {
        const menuItem = this.state.menu[orderItem.menuId];
        total += (orderItem.quantity * menuItem.price);
        return <div key={"item-" + orderItem.menuId}>{orderItem.quantity} x {menuItem.name} = {this.receiveGetCurrency(orderItem.quantity * menuItem.price)}</div>
      });
      return (<div key={"order-" + index}>
        {summary}
        <div key={"total-" + index + 1}>Order Total: {this.receiveGetCurrency(total)}</div>
        <hr className="box"></hr>
      </div>)
    })}
    </div>
  }

  render(){

    const currentOrder = 
      (<div>
        <h2>Your basket</h2>
        <div className="basket">{this.state.currentOrder ? this.displayCurrentOrder() : <div>Your basket is empty</div>}</div>
      </div>)

    const allOrders = this.state.orders &&
      (<div>
        <h2>View all orders</h2>
        <div className="orders">{ this.displayAllOrders() }</div>
      </div>)

    const starters = this.state.menu && 
    <Menu 
      receiveHandleChange={(id, event) => this.receiveHandleChange(id, event)} 
      receiveGetCurrency={(string) => this.receiveGetCurrency(string)} 
      menu={this.state.menu} 
      currentOrder={this.state.currentOrder}
    />

    // const mains = this.state.menu && this.displayMenuItems("main", "Mains");
    // const desserts = this.state.menu && this.displayMenuItems("dessert", "Desserts")

    return (
      <div>
        <h1>DeliverEat</h1>
        <hr className="title"></hr>
        <form onSubmit={this.handleSubmit} className="menu__form">
          <div className="form__wrapper">
            <input onChange={this.handleFormData} name="username"  id="username" className="menu__form__username" type="text" placeholder="Full name"></input>
            <input onChange={this.handleFormData} name="telephone" id="telephone" className="menu__form__telephone" type="text" placeholder="Telephone number"></input>
            <button type="submit">Send order</button>
          </div>

          { currentOrder }
          { allOrders }
          { starters }
          {/* { mains }
          { desserts } */}

        </form>      
      </div>
    )
  }
}

export default App;