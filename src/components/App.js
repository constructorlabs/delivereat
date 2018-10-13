import React from 'react';
import Menu from './Menu';
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchAllOrders = this.fetchAllOrders.bind(this);
    this.receiveHandleChange = this.receiveHandleChange.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    this.displayCurrentOrder = this.displayCurrentOrder.bind(this);
    this.displayAllOrders = this.displayAllOrders.bind(this);
    
    this.handleFormData = this.handleFormData.bind(this);
    this.toolTipOn = this.toolTipOn.bind(this);
    this.toolTipOff = this.toolTipOff.bind(this);
    
    this.state = { 
      menu: {},
      currentOrder: null,
      orders: null,
      tooltip: null
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

    Object.values(event.target).forEach(item => {
      if (item.type === "text") { 
        item.value = ""; 
      }
    });
  }

  handleFormData (event) {   
    const currentOrder = Object.assign({}, this.state.currentOrder, {[event.target.name]: event.target.value});
    this.setState({ currentOrder });
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

  getCurrency (string) {
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

    return <div>
    { values
      .filter(orderItem => typeof orderItem === "object")
      .map(orderItem => {
        const menuItem = this.state.menu[orderItem.menuId];
        total += orderItem.quantity * menuItem.price;
        return <div key={"current-order-" + orderItem.menuId}>{orderItem.quantity} x {menuItem.name} = {this.getCurrency(orderItem.quantity * menuItem.price)}</div>
      })} 
      <hr className="box"></hr>
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
      const summary = Object.values(order)
      .filter(orderItem => typeof orderItem === "object")
      .map(orderItem => {
        const menuItem = this.state.menu[orderItem.menuId];
        total += (orderItem.quantity * menuItem.price);
        return <div key={"item-" + orderItem.menuId}>{orderItem.quantity} x {menuItem.name} = {this.getCurrency(orderItem.quantity * menuItem.price)}</div>
      });
      return (<div key={"order-" + index}>
        <div><strong>Order from: {order.username}</strong></div>
        {summary}
        <div key={"total-" + index + 1}>Order Total: {this.getCurrency(total)}</div>
        <hr className="box"></hr>
      </div>)
    })}
    </div>
  }

  toolTipOn(event) {
    // const bx = document.querySelector(".thumb");
    // const n = event.target
    // console.log(event.target.outerHTML);
    
    // bx.style.left = event.clientX;
    // bx.style.top = event.clientY;
    this.setState({
      tooltip: true
    })
  }

  toolTipOff(event) {
    // console.log(event.clientX);
    // console.log(event.clientY);
    this.setState({
      tooltip: false
    })
  }

  render(){

    const currentOrderHasFood = this.state.currentOrder && Object.values(this.state.currentOrder).find(item => typeof item === "object");

    const basket = 
      (<div className="basket">
        <h2>Your basket <i className="fas fa-1x fa-shopping-basket"></i></h2>
        <div>{ currentOrderHasFood ? this.displayCurrentOrder() : <div>Your basket is empty</div>}</div>
      </div>)

    const formElements = currentOrderHasFood && 
      (<div className="form__elements">
        <input onChange={this.handleFormData} name="username" value={this.state.currentOrder.username || ""}  id="username" className="menu__form__username" type="text" placeholder="Full name"></input>
        <input onChange={this.handleFormData} name="telephone" value={this.state.currentOrder.telephone || ""} id="telephone" className="menu__form__telephone" type="text" placeholder="Telephone number"></input>
        {this.state.currentOrder.username && this.state.currentOrder.telephone &&
          <button name="submit" id="submit" className="menu__form__submit" type="submit">Send order</button>
        } 
      </div>)

    const allOrders = this.state.orders &&
      (<div className="orders">
        <h2>View all orders</h2>
        <div>{ this.displayAllOrders() }</div>
      </div>)

    const menu = this.state.menu && 
    <Menu 
      receiveHandleChange={(id, event) => this.receiveHandleChange(id, event)} 
      getCurrency={(string) => this.getCurrency(string)} 
      menu={this.state.menu} 
      currentOrder={this.state.currentOrder}
    />

    return (
      <div>
        <h1>DeliverEat <i className="fas fa-1x fa-utensils"></i></h1>
        <hr className="title"></hr>
        
        {/* <a href="#" onMouseEnter={this.toolTipOn} onMouseLeave={this.toolTipOff}>Toggle<div className="thumb"></div></a> */}
        {/* {this.state.tooltip && <div className="thumb"></div>} */}
        {/* <a href="#" onMouseOver={this.toolTip} className="tooltip"><span title="More">CSS3 Tooltip</span></a> */}
        
        <form onSubmit={this.handleSubmit} className="menu__form">
          <div className="form__wrapper">
            { basket }
            { formElements }
          </div>
          { allOrders }
          { menu }  
        </form> 
      </div>
    )
  }
}

export default App;