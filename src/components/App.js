import React from "react";

import "../styles/App.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: []
    };

    this.addToOrder = this.addToOrder.bind(this);
  }

  componentDidMount() {
    fetch("api/menu")
      .then(response => response.json())
      .then(result => {
        this.setState({ menu: result });
      });
  }

  addToOrder(event, id) {
    console.log(id);
  }

  render() {
    return (
      <div>
        <h2>Menu</h2>
        <ul>
          {this.state.menu.map(item => (
            <li key={item.id} id={item.id}>
              {item.name} - £{item.price}
              <button onClick={(event) => this.addToOrder(event, item.id)}>+</button>
            </li>
          ))}
        </ul>

        <h3>My Order</h3>
        <div className="order-summary"></div>
        <form>

        </form>
      </div>
    );
  }
}

export default App;
