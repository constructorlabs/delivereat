import React from 'react';
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchAllOrders = this.fetchAllOrders.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createQuantityOptions = this.createQuantityOptions.bind(this);
    this.displayMenuItems = this.displayMenuItems.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    this.displayCurrentOrder = this.displayCurrentOrder.bind(this);
    this.displayAllOrders = this.displayAllOrders.bind(this);



    this.state = { 
      formData: {},
      menu: {},
      orders: null,
      currentOrder: null,
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
    fetch('/api/order', {
      method: 'post',
      body: JSON.stringify(this.state.currentOrder),
      headers: { 'Content-Type': 'application/json' }
    }
    ).then(response => response.json()
    ).then(order => {
      this.fetchAllOrders();
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
        currentOrder: null
       })
    });
  }

/* add item to basket for current order
///////////////////////////////////////////*/

  handleChange (id, event) {
    let currentOrder;
    if (event.target.value === "0") {
      currentOrder = Object.assign({}, this.state.currentOrder);
      delete currentOrder[id];
    } else {
      currentOrder = Object.assign({}, this.state.currentOrder, { [id]: {"menuId": id, quantity: event.target.value }})
    }
    const formData = Object.assign({}, formData, {formData: {[event.target.name]: event.target.value}});
    this.setState({ 
      currentOrder,
      formData
     });
  }

/* create quantity options for menu each item
///////////////////////////////////////////*/

  createQuantityOptions (name, id) {
    const array = [];
    for (let i=0; i<=10; i++) array.push(i);
    return <select 
              value={this.state.currentOrder ? this.value : ""}
              onChange={(event) => this.handleChange(id, event)} 
              name={name} 
              id={id}>
      { array.map(item => {
          const keyName = name.toLowerCase().split(" ").join("-");
          return <option value={item} key={keyName + "-option-" + item}>{item}</option> 
      })}
    </select>
  }

/* create quantity options for menu each item
///////////////////////////////////////////*/

  displayMenuItems (course, title) {
    const values = Object.values(this.state.menu);
    return <div><h2>{title}</h2><ul className="menu__item"> {
    values.filter(item => item.type === course)
    .map(item => {
      return <li key={course + "-menu-item-" + item.menuId}>
            <div><img src={item.image}></img></div>
            <div><strong>{item.name}: {this.getCurrency(item.price)}</strong><br />
            Quantity: {this.createQuantityOptions(item.name, item.menuId)}</div>
          </li>
    })}
    </ul>
    </div>
  }

/* display prices as GBPs
///////////////////////////////////////////*/

  getCurrency (string) {
    return string.toLocaleString("en-GB", {
      style: "currency", currency: "GBP"
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
    return <div>
    { values.map(orderItem => {
        const menuItem = this.state.menu[orderItem.menuId];
        total += orderItem.quantity * menuItem.price;
        return <div key={"current-order-" + orderItem.menuId}>{orderItem.quantity} x {menuItem.name} = {this.getCurrency(orderItem.quantity * menuItem.price)}</div>
      })} 
      <hr />
      <div>Total: {this.getCurrency(total)}</div>
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
        return <div key={"order-" + orderItem.menuId}>{orderItem.quantity} x {menuItem.name} = {this.getCurrency(orderItem.quantity * menuItem.price)}</div>
      });
      return (<div>
        {summary}
        <div key={"total-" + index}>Order Total: {this.getCurrency(total)}</div>
        <hr />
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

    const starters = this.state.menu && this.displayMenuItems("starter", "Starters");
    const mains = this.state.menu && this.displayMenuItems("main", "Mains");
    const desserts = this.state.menu && this.displayMenuItems("dessert", "Desserts")

    return (
      <div>
        <h1>DeliverEat</h1>
        <hr className="title"></hr>
        <form onSubmit={this.handleSubmit} id="form" className="menu__form">
          <input type="text" placeholder="your name..." id="username" className="username"></input>
          <button type="submit">Send order</button>
          
          { currentOrder }
          { allOrders }
          { starters }
          { mains }
          { desserts }

        </form>      
      </div>
    )
  }
}

export default App;