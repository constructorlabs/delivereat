import React from 'react';
import Menu from './Menu';
import OrdersDisplayed from './OrdersDisplayed';
import OrderCurrent from './OrderCurrent';
import '../styles/App.scss';
import '../styles/Form.scss';
import '../styles/Tooltip.scss';

class App extends React.Component {
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.receiveHandleChange = this.receiveHandleChange.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    this.emptyBasket = this.emptyBasket.bind(this); 
    this.toggleBasket =this.toggleBasket.bind(this); 
    this.filterOrders = this.filterOrders.bind(this); 
    this.handleFormData = this.handleFormData.bind(this); 
    this.formatDate = this.formatDate.bind(this);

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

  filterOrders (event) {
    this.setState({ filterInput: event.target.value });
  }

/* control basket
///////////////////////////////////////////*/

  emptyBasket (event) {
    event && event.preventDefault();
    this.setState({ currentOrder: null });
  }

  toggleBasket (event) {
    event.preventDefault();
    this.setState({ basketVisible: !this.state.basketVisible });
  }

  render(){

    const currentOrderHasFood = this.state.currentOrder && Object.values(this.state.currentOrder).find(item => typeof item === "object");

    const currentOrderComp =
    (<OrderCurrent
      currentOrder={this.state.currentOrder}
      menu={this.state.menu}
      emptyBasket={this.emptyBasket}
      getCurrency={this.getCurrency}
    />)

    const basket = this.state.basketVisible &&
      (<div className="basket">
        <h2>Your basket <i className="fas fa-1x fa-shopping-basket"></i></h2>
        <div>{ currentOrderHasFood ? currentOrderComp : <div>Your basket is empty</div>}</div>
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
      <OrdersDisplayed
        filterInput={this.state.filterInput}
        orders={this.state.orders}
        menu={this.state.menu}
        getCurrency={(price) => this.getCurrency(price)}
        filterOrders={this.filterOrders}
      />

    const menu = this.state.menu && 
    <Menu 
      receiveHandleChange={(id, event) => this.receiveHandleChange(id, event)} 
      getCurrency={(price) => this.getCurrency(price)} 
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