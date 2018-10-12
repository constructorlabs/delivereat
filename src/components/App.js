import React from "react";

import "../styles/App.scss";
import Menu from "./Menu";
import Order from "./Order";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      order: []
    };

    this.receiveAddClick = this.receiveAddClick.bind(this);
    this.receiveRemoveClick = this.receiveRemoveClick.bind(this);
    this.receiveClickPlus = this.receiveClickPlus.bind(this);
    this.receiveClickMinus = this.receiveClickMinus.bind(this);
  }

  componentDidMount() {
    fetch("/api/menu")
      .then(response => response.json())
      .then(body => {
        const menu = Object.values(body);

        this.setState({
          menu: menu
        });
      });
  }

  receiveAddClick(name) {
    this.setState(
      {
        order: this.state.order.concat({
          name: name,
          number: 1,
          price: this.state.menu.find(item => item.name == name).price
        })
      },
      () => console.log(this.state.order)
    );
  }
  receiveRemoveClick(name) {
    this.setState(
      {
        order: this.state.order.filter(item => item.name !== name)
      },
      () => console.log(this.state.order)
    );
  }
  receiveClickPlus(orderName) {
    this.setState(
      {
        order: this.state.order.map(item => {
          if (item.name == orderName) {
            return (item = { name: item.name, number: item.number + 1 });
          } else {
            return item;
          }
        })
      },
      () => console.log(this.state.order)
    );
  }
  receiveClickMinus(orderName) {
    this.setState(
      {
        order: this.state.order
          .map(item => {
            if (item.name == orderName && item.number > 0) {
              return (item = { name: item.name, number: item.number - 1 });
            } else {
              return item;
            }
          })
          .filter(item => item.number !== 0)
      },
      () => console.log(this.state.order)
    );
  }
  render() {
    return (
      <div>
        <h1>Food Heaven</h1>
        <Menu
          receiveAddClick={this.receiveAddClick}
          menu={this.state.menu}
          order={this.state.order}
          receiveRemoveClick={this.receiveRemoveClick}
        />
        <Order
          order={this.state.order}
          receiveClickPlus={this.receiveClickPlus}
          receiveClickMinus={this.receiveClickMinus}
        />
      </div>
    );
  }
}

export default App;
