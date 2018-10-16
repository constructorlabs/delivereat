import React from 'react';
import AddOrderModal from './AddOrderModal.js'
import Order from './Order.js'

// import '../styles/Menu.scss';

class Menu extends React.Component {
    constructor(){
      super();

      this.state ={
        menu: [],
        modalDetails: "",
        modalOpen: false,
        order: {},
        total: ""
      }

    this.menuCall = this.menuCall.bind(this);
    this.itemCall = this.itemCall.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.receiveModalCloseBtn = this.receiveModalCloseBtn.bind(this);
    this.receiveOrderSubmit = this.receiveOrderSubmit.bind(this);
    this.receiveRemoveItem = this.receiveRemoveItem.bind(this);
    }

componentDidMount(){
  this.menuCall()
}

menuCall(){
  fetch(`/menu`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        menu: body
      })
    })
}

itemCall(menuId){
  fetch(`/menu/${menuId}`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        modalDetails: body
      })
    })
}

handleClick(menuId) {
  this.itemCall(menuId);
  this.setState({
    modalOpen: true
  })
}

receiveModalCloseBtn(){
  this.setState({
    modalOpen: false,
  })
}

updateOrder(itemId, itemQuantity){
  const newOrder = Object.assign({}, this.state.order);

  if (newOrder[itemId]) {
    newOrder[itemId] = newOrder[itemId] + itemQuantity
  } else {
    newOrder[itemId] = itemQuantity
  }

  Object.entries(this.order).reduce()

  this.setState({
    order: newOrder,
    total: ""
  })
}

receiveOrderSubmit(){
  fetch(`/order`, {method:"POST", headers: {
            "Content-Type": "application/json; charset=utf-8",
        }, body: JSON.stringify(this.state.order)})
        this.setState({
          order: {}
        })
}

receiveRemoveItem(menuItem){
  const orderEntries = Object.entries(this.state.order);
  console.log(menuItem)
  // this.setState{(
  //   order:
  // )}
}

render(){
  return(
  <div>
    {this.state.menu.map (item => {
      return(
        <div onClick={() => this.handleClick(item.id)}>
          {item.name}{item.price}
          {item.vegetarian ? <img className="vegan" src="static/vegan.png" /> : null}
        </div>
      )
    })}
    <div><AddOrderModal receiveModalCloseBtn={this.receiveModalCloseBtn} updateOrder={this.updateOrder} className= {this.state.modalOpen ? "modal2" : "modal"}  modalDetails={this.state.modalDetails}/></div>
    <div><Order receiveRemoveItem={this.receiveRemoveItem} receiveOrderSubmit={this.receiveOrderSubmit} order={this.state.order} menu={this.state.menu} /></div>
  </div>
)

}
}

export default Menu;
