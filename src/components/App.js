import React from 'react';
import Menu from './Menu';
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.receiveHandleChange = this.receiveHandleChange.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    // this.fetchAllOrders = this.fetchAllOrders.bind(this); // no need to bind
    // this.displayCurrentOrder = this.displayCurrentOrder.bind(this); // no need to bind yet
    // this.displayAllOrders = this.displayAllOrders.bind(this); // no need to bind yet
    // this.emptyBasket = this.emptyBasket.bind(this); // no need to bind yet
    // this.toggleBasket =this.toggleBasket.bind(this); // no need to bind yet
    // this.filterOrders = this.filterOrders.bind(this); // no need to bind yet
    // this.handleFormData = this.handleFormData.bind(this); // no need to bind yet
    // this.toolTipOn = this.toolTipOn.bind(this); // no need to bind yet
    // this.toolTipOff = this.toolTipOff.bind(this); // no need to bind yet
    // this.formatDate = this.formatDate.bind(this); // no need to bind yet

    this.state = { 
      menu: {},
      currentOrder: null,
      orders: null,
      basketVisible: null,
      filterInput: null,
      tooltip: "thumb"
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
      currentOrder = Object.assign({}, this.state.currentOrder, { [id]: {"menuId": id, "quantity": Number(event.target.value) }, "date": this.formatDate()})
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

  formatDate (){
      const date = new Date();
      const addZero = n => n < 10 ? `0${n}` : n;
      return `${addZero(date.getDate())}-${addZero(date.getMonth()+1)}-${date.getFullYear()}`;
  }

/* display current order in basket
///////////////////////////////////////////*/

  displayCurrentOrder () {
    let total = 0;
    const values = Object.values(this.state.currentOrder);
    console.log(values)
    if (values.length === 0) { 
      this.setState({ currentOrder: null });
      return;
    }
    return <div>
    { values
      .filter(orderItem => typeof orderItem === "object")
      .map((orderItem) => {
        const menuItem = this.state.menu[orderItem.menuId];
        total += orderItem.quantity * menuItem.price;
        return <div key={"current-order-" + orderItem.menuId}>{orderItem.quantity} x {menuItem.name} = {this.getCurrency(orderItem.quantity * menuItem.price)}</div>
      })}
       <hr className="box"></hr>
      <div>Date: {this.state.currentOrder.date}</div>
      <div>Total: {this.getCurrency(total)}</div>
      <button onClick={this.emptyBasket} type="button" className="basket__state-empty">Empty basket</button>
    </div>
  }

/* display all orders
///////////////////////////////////////////*/

  displayAllOrders () {
    let total = 0;
    const input = this.state.filterInput || null;
    const values = Object.values(this.state.orders);
    return <div>
    { values
      .filter(order => input ? order.username.includes(input) : true)
      .map((order, index) => {
        const summary = Object.values(order)
        .filter(orderItem => typeof orderItem === "object")
        .map(orderItem => {
          const menuItem = this.state.menu[orderItem.menuId];
          total += (orderItem.quantity * menuItem.price);
          return <div key={"item-" + orderItem.menuId}>{orderItem.quantity} x {menuItem.name} = {this.getCurrency(orderItem.quantity * menuItem.price)}</div>
        });
        return (<div key={"order-" + index}>
          <div><strong>Order name: {order.username}</strong></div>

          {summary}

          <div>Date: {order.date}</div>
          <div key={"total-" + index + 1}>Total: {this.getCurrency(total)} + { total < 30 ? (this.getCurrency(3) + " delivery charge") : `free delivery` }</div>
          {index < values.length-1 && <hr className="box"></hr>}
        </div>)
      })
    }
    </div>
  }

  filterOrders (event) {
    this.setState({ filterInput: event.target.value });
  }

/* control basket
///////////////////////////////////////////*/

  emptyBasket (event) {
    event.preventDefault();
    this.setState({ currentOrder: null });
  }

  toggleBasket (event) {
    event.preventDefault();
    this.setState({ basketVisible: !this.state.basketVisible });
  }

  toolTipOn(event) {
    this.setState({ tooltip: "thumb.visible" })
  }

  toolTipOff(event) {
    this.setState({ tooltip: "thumb" })
  }

  render(){

    const currentOrderHasFood = this.state.currentOrder && Object.values(this.state.currentOrder).find(item => typeof item === "object");

    const basket = this.state.basketVisible &&
      (<div className="basket">
        <h2>Your basket <i className="fas fa-1x fa-shopping-basket"></i></h2>
        <div>{ currentOrderHasFood ? this.displayCurrentOrder() : <div>Your basket is empty</div>}</div>
      </div>)

    const basketCount = this.state.currentOrder && (Object.values(this.state.currentOrder).filter(item => typeof item === "object").length || null);

    const formElements = currentOrderHasFood && this.state.basketVisible &&
      (<div className="form__elements">
        <input onChange={this.handleFormData} name="username" value={this.state.currentOrder.username || ""}  id="username" className="menu__form__username" type="text" placeholder="Full name"></input>
        <input onChange={this.handleFormData} name="telephone" value={this.state.currentOrder.telephone || ""} id="telephone" className="menu__form__telephone" type="text" placeholder="Telephone number"></input>
        {this.state.currentOrder.username && this.state.currentOrder.telephone &&
          <button name="submit" id="submit" className="menu__form__submit" type="submit">Send order</button>
        } 
      </div>)

    const allOrders = this.state.orders &&
      (<div className="orders">
        <h2>View all orders <i className="fas fa-1x fa-pound-sign"></i></h2>
        <div>{ this.displayAllOrders() }</div>
        <div><input type="text" onChange={this.filterOrders} className="orders__filter" placeholder="&#128269; Search orders..."></input></div>
      </div>)

    const menu = this.state.menu && 
    <Menu 
      receiveHandleChange={(id, event) => this.receiveHandleChange(id, event)} 
      getCurrency={(string) => this.getCurrency(string)} 
      menu={this.state.menu} 
      currentOrder={this.state.currentOrder}
    />

    return (
        <React.Fragment>

        <div className="header">
          <h1>DeliverEat <i className="fas fa-1x fa-utensils"></i></h1>
          <div className="basket__menu"><h1 className="basket__items-count">{basketCount}</h1><h1><a href="#" onClick={this.toggleBasket}><i className="fas fa-1x fa-shopping-basket basket__display-toggle"></i></a></h1></div>
        </div>
        <div className="content">
          <form onSubmit={this.handleSubmit} className="menu__form">
            <div className="form__wrapper">

              {/* <div className={this.state.tooltip}><img src="https://images.unsplash.com/photo-1523986371872-9d3ba2e2a389"></img></div>
              <a href="#" onMouseEnter={this.toolTipOn} onMouseLeave={this.toolTipOff}>Tooltip</a>  */}
              
              { basket }
              { formElements }

            </div>

            { allOrders }
            { menu }  

          </form> 
        </div>
      </React.Fragment>
    )
  }
}

export default App;