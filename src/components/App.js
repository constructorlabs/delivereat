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
      .then(result => this.setState({ dishes: result }))
      .catch(error => console.error("Error: ", error));
  }

  addToOrder(dishId, name) {
    if (this.state.basket[dishId]) {
      let updatedBasket = Object.assign({}, this.state.basket);
      updatedBasket[dishId].quantity++;
      this.setState({ basket: updatedBasket });
    } else {
      let updatedBasket = Object.assign({}, this.state.basket, {
        [dishId]: { dishId: dishId, name: name, quantity: 1 }
      });
      this.setState({ basket: updatedBasket });
    }
  }

  decreaseQuantity(dishId) {
    let updatedBasket = Object.assign({}, this.state.basket);

    if (this.state.basket[dishId].quantity === 1) {
      delete updatedBasket[dishId];
    } else {
      updatedBasket[dishId].quantity--;
    }

    this.setState({ basket: updatedBasket });
  }

  increaseQuantity(dishId) {
    let updatedBasket = Object.assign({}, this.state.basket);
    updatedBasket[dishId].quantity++;
    this.setState({ basket: updatedBasket });
  }

  checkout() {
    fetch("http://localhost:8080/api/orders", {
      method: "post",
      body: JSON.stringify(this.state.basket),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => console.log("Order post success: ", JSON.stringify(data)))
      .catch(error => console.error("Error: ", error));

    this.setState({
      basket: {}
    });
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
