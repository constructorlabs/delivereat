import React from "react";
import Basket from './Basket';


class Menu extends React.Component {
  constructor() {
    super();
    this.state = {basket:{}}
    this.basketAdd = this.basketAdd.bind(this);
    this.getCourse = this.getCourse.bind(this);
  }

  basketAdd(foodItem){
    const newBasket = Object.assign({}, this.state.basket);
    if (this.state.basket[foodItem.id]) {
      newBasket[foodItem.id] += 1
    } else {
      newBasket[foodItem.id] = 1
    }

    this.setState({ basket: newBasket }, () => {
      console.log(this.state);
    })    
  }

  

  basketSend(){

  }

  getCourse(course){
    return this.props.menu.filter(item =>
      item.type === course).map(foodItem =>
     { return (
      <li key={foodItem.id}>
      <h1>{foodItem.name}</h1>
      <img src={foodItem.image}/>
      <button onClick={() => this.basketAdd(foodItem)}>Order Me</button>
      </li>
      )
  })
}



    

  render() {

  
    return (
    
     <div>
      <ul className="menu">

     <h1>Starter</h1>
      {this.getCourse('starter')}
      
      <h1>Main</h1>
      {this.getCourse('main')}

      <h1>Dessert</h1>
      {this.getCourse('dessert')}
      </ul>
      

    <Basket basket={this.state.basket} menu={this.props.menu} receiveOrder={this.receiveOrder} />
    </div>
    );
    }
}

export default Menu;