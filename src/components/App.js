import React from 'react';
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.getCourse = this.getCourse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createQuantityMenu = this.createQuantityMenu.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    
    this.displayOrder = this.displayOrder.bind(this);
    this.displayAllOrders = this.displayAllOrders.bind(this);
    this.fetchAllOrders = this.fetchAllOrders.bind(this);

    this.state = { 
      menu: {},
      orders: {},
      currentOrder: null
    }
  }

  componentDidMount () {
    fetch("/api/menu")
    .then(response => response.json())
    .then(menu => {
      this.setState({ menu })
    })
  }
  
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

  handleChange (id, event) {
    let currentOrder;
    if (event.target.value === "0") {
      currentOrder = Object.assign({}, this.state.currentOrder);
      delete currentOrder[id];
    } else {
      currentOrder = Object.assign({}, this.state.currentOrder, { [id]: {"menuId": id, quantity: event.target.value }})
    }
    this.setState({ currentOrder })
  }

  createQuantityMenu (name, id) {
    const array = [];
    for (let i=0; i<=10; i++) array.push(i);
    return <select 
              value={this.state.currentOrder ? this.value : ""}
              onChange={(event) => this.handleChange(id, event)} 
              name={name} 
              id={id}
            >
      { array.map(item => {
          return <option value={item} key={item}>{item}</option> 
      })}
    </select>
  }

  getCourse (course) {
    const values = Object.values(this.state.menu);
    return <ul className="menu__item"> {
    values.filter(item => item.type === course)
    .map(item => {
      return <li key={item.menuId}>
            <div><img src={item.image}></img></div>
            <div><strong>{item.name}: {this.getCurrency(item.price)}</strong><br />
            Quantity: {this.createQuantityMenu(item.name, item.menuId)}</div>
          </li>
    })}
    </ul>
  }

  getCurrency (string) {
    return string.toLocaleString("en-GB", {
      style: "currency", currency: "GBP"
    });
  }

  displayOrder () {
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
        return <div key={orderItem.menuId}>{orderItem.quantity} x {menuItem.name} = {this.getCurrency(orderItem.quantity * menuItem.price)}</div>
      })} 
      <hr />
      <div>Total: {this.getCurrency(total)}</div>
    </div>
  }

  displayAllOrders () {
    const keys = Object.keys(this.state.orders);
    // values.forEach(item => {
    //   console.log("Order: ", item);
    // });

    keys.forEach(order => {

      console.log(order)
      // const orderValues = Object.values(order);
      // orderValues.forEach(orderItem => {
      //   const menuItem = this.state.menu[orderItem.menuId];
      //   console.log("name: " + menuItem.name);
      //   console.log("price: " + menuItem.price);
      // });
    });
      // const menuItem = this.state.menu[orderItem.menuId];
      // total += orderItem.quantity * menuItem.price;
      // return <div key={orderItem.menuId}>{orderItem.quantity} x {menuItem.name} = {this.getCurrency(orderItem.quantity * menuItem.price)}</div>
    
  }

  render(){

    const allOrders = this.state.orders &&
      (<React.Fragment>
      <h2>View all orders</h2>
      <div className="basket">
         {this.displayAllOrders()}
      </div>
      </React.Fragment>)

    return (
      <div>
        <h1>DeliverEat app</h1>
          <form onSubmit={this.handleSubmit} className="menu__form">
            <button type="submit">PLACE YOUR ORDER</button>
            <h2>Your basket</h2>
            <div className="basket">
              {this.state.currentOrder ? this.displayOrder() : <div>Your basket is empty</div>}
            </div>
            {allOrders}
            <h2>Starters</h2> {this.state.menu && this.getCourse("starter")}
            <hr></hr>
            <h2>Mains</h2> {this.state.menu && this.getCourse("main")}
            <hr></hr>
            <h2>Desserts</h2> {this.state.menu && this.getCourse("dessert")}
          </form>      
      </div>
    )
  }
}

export default App;