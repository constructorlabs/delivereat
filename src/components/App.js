import React from "react";
import Dishes from "./Dishes";
import Basket from "./Basket.js";
import "../styles/components/app.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      dishes: {},
      categories: {},
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

    fetch("api/categories")
      .then(response => response.json())
      .then(result => this.setState({ categories: result }))
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
        <header className="header" />

        <main className="main">
          <aside className="main__aside-left">
            <h3>Categories</h3>
            <nav className="categories">
              {Object.keys(this.state.categories).map(category => (
                <a className="categories__category" key={category} href="#">
                  {category}
                </a>
              ))}
            </nav>
          </aside>

          <article className="main__article">
            {Object.values(this.state.categories).map(dishes => (
              <Dishes
                key={dishes[0].category}
                dishes={dishes}
                addToOrder={this.addToOrder}
              />
            ))}
          </article>

          <aside className="main__aside-right">
            <h3>My Order</h3>
            <Basket
              basket={this.state.basket}
              dishes={this.state.dishes}
              decreaseQuantity={this.decreaseQuantity}
              increaseQuantity={this.increaseQuantity}
              checkout={this.checkout}
            />
          </aside>
        </main>

        <footer className="footer" />
      </div>
    );
  }
}

export default App;
