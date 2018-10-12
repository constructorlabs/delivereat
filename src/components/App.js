import React from "react";
import Dishes from "./Dishes";
import Basket from "./Basket.js";
import "../styles/components/app.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      dishes: {},
      basket: {}
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.checkout = this.checkout.bind(this);
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

  decreaseQuantity(event, id) {
    let updatedBasket = Object.assign({}, this.state.basket);

    if (this.state.basket[id].quantity === 1) {
      delete updatedBasket[id];
    } else {
      updatedBasket[id].quantity--;
    }

    this.setState({ basket: updatedBasket });
  }

  increaseQuantity(event, id) {
    let updatedBasket = Object.assign({}, this.state.basket);
    updatedBasket[id].quantity++;
    this.setState({ basket: updatedBasket });
  }

  checkout(event) {
    console.log("checkout" + this.state.basket[1]);
  }

  render() {
    return (
      <div>
        <h3>Menu</h3>
        <Dishes dishes={this.state.dishes} addToOrder={this.addToOrder} />

        <h3>My Order</h3>
        <Basket
          basket={this.state.basket}
          dishes={this.state.dishes}
          decreaseQuantity={this.decreaseQuantity}
          increaseQuantity={this.increaseQuantity}
          checkout={this.checkout}
        />
      </div>
    );
  }
}

export default App;
