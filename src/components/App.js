import React from "react";
import Dishes from "./Dishes";
import Basket from "./Basket.js";
import Checkout from "./Checkout";
import "../styles/components/app.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      dishes: {
        1: {
          dishId: 1,
          name: "Chicken Caesar Salad",
          category: "Salads",
          description: "",
          price: 6.55,
          imageUrl: "",
          inStock: true
        },
        2: {
          dishId: 2,
          name: "Grilled Chicken Breast Burger",
          category: "Burgers",
          description: "",
          price: 5.75,
          imageUrl: "",
          inStock: true
        },
        3: {
          dishId: 3,
          name: "Classic 6 oz. Beef Burger",
          category: "Burgers",
          description: "",
          price: 5.75,
          imageUrl: "",
          inStock: true
        }
      },
      categories: {},
      basket: {
        1: {
          dishId: 1,
          name: "Chicken Caesar Salad",
          category: "Salads",
          description: "",
          price: 6.55,
          imageUrl: "",
          inStock: true,
          quantity: 2
        },
        2: {
          dishId: 2,
          name: "Grilled Chicken Breast Burger",
          category: "Burgers",
          description: "",
          price: 5.75,
          imageUrl: "",
          inStock: true,
          quantity: 1
        },
        3: {
          dishId: 3,
          name: "Classic 6 oz. Beef Burger",
          category: "Burgers",
          description: "",
          price: 5.75,
          imageUrl: "",
          inStock: true,
          quantity: 3
        }
      },
      renderCheckout: false,
      orderPlaced: false,
      orderId: ""
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.checkout = this.checkout.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
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
    this.setState({
      renderCheckout: true
    });
  }

  placeOrder() {
    console.log("place order");

    fetch("http://localhost:8080/api/orders", {
      method: "post",
      body: JSON.stringify(this.state.basket),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Order post success: ", JSON.stringify(data));
        this.setState({
          orderId: data.orderId,
          basket: {},
          orderPlaced: true
        });
      })
      .catch(error => console.error("Error: ", error));
  }

  render() {
    console.log("render");
    if (this.state.renderCheckout) {
      return (
        <main className="main">
          <Checkout
            basket={this.state.basket}
            dishes={this.state.dishes}
            placeOrder={this.placeOrder}
            orderPlaced={this.state.orderPlaced}
            orderId={this.state.orderId}
          />
        </main>
      );
    }

    return (
      <div>
        <header className="header" />

        <main className="main">
          <aside className="main__aside-left">
            <div className="sticky">
              <h3>Categories</h3>
              <nav className="categories">
                {Object.keys(this.state.categories).map((category, index) => (
                  <a
                    className="categories__category"
                    key={category}
                    href={`#category${index}`}
                  >
                    {category}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="main__article">
            {Object.values(this.state.categories).map((dishes, index) => (
              <Dishes
                key={dishes[0].category}
                dishes={dishes}
                index={index}
                addToOrder={this.addToOrder}
              />
            ))}
          </article>

          <aside className="main__aside-right">
            <div className="sticky">
              <h3>My Order</h3>
              <Basket
                basket={this.state.basket}
                dishes={this.state.dishes}
                decreaseQuantity={this.decreaseQuantity}
                increaseQuantity={this.increaseQuantity}
                checkout={this.checkout}
              />
            </div>
          </aside>
        </main>

        <footer className="footer" />
      </div>
    );
  }
}

export default App;
