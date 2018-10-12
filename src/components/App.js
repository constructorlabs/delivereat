import React from "react";
import Dishes from "./Dishes";
import Basket from "./Basket.js";
import "../styles/components/app.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      dishes: [],
      basket: {}
    };

    this.addToOrder = this.addToOrder.bind(this);
  }

  componentDidMount() {
    fetch("api/dishes")
      .then(response => response.json())
      .then(result => {
        this.setState({ dishes: result });
      });
  }

  addToOrder(event, id, name) {
    if (this.state.basket[id]) {
      let updatedBasket = Object.assign({}, this.state.basket);
      updatedBasket[id].quantity++;
      this.setState({ basket: updatedBasket });
    } else {
      let updatedBasket = Object.assign({}, this.state.basket, {
        [id]: { id: id, name: name, quantity: 1 }
      });
      this.setState({ basket: updatedBasket });
    }
  }

  render() {
    return (
      <div>
        <h3>Menu</h3>
        <Dishes dishes={this.state.dishes} addToOrder={this.addToOrder} />

        <h3>My Order</h3>
        <Basket basket={this.state.basket}/>
      </div>
    );
  }
}

export default App;
