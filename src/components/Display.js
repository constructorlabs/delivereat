import React from "react";
import Item from "./Item";

class Display extends React.Component {
  constructor() {
    super();
    this.state = {
      menuItems: [],
      currentOrder: {}
    };

    this.receiveNewQuantity = this.receiveNewQuantity.bind(this);
  }

  componentDidMount() {
    fetch(`/menu`)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          menuItems: Object.values(data)
        });
        console.log(this.state);
      });
  }

  receiveNewQuantity(id, quantity) {
    const currentOrder = Object.assign({}, this.state.currentOrder, {
      [id]: +quantity
    });

    this.setState({
      currentOrder
    });
  }

  render() {
    console.log(this.state.currentOrder);
    return (
      <div className="display">
        <h1 className="display__title">The Menu</h1>
        <form onSubmit={this.handleSubmit}>
          <ul className="display__menuItems">
            {this.state.menuItems.map(item => {
              return (
                <Item
                  item={item}
                  key={item.id}
                  receiveNewQuantity={this.receiveNewQuantity}
                />
              );
            })}
          </ul>
        </form>
      </div>
    );
  }
}

export default Display;
