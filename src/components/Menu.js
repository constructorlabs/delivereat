import React from "react";
import MenuItem from "./MenuItem";
import Order from "./Order";
import OldOrders from "./OldOrders";

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      menuItems: {},
      order: {},
      showOrder: false,
      previousOrders: {}
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReorder = this.handleReorder.bind(this);
    this.receiveOrder = this.receiveOrder.bind(this);
  }

  componentDidMount() {
    fetch(`/menu`)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          menuItems: data
        });
      });
  }

  receiveOrder(item, quantity) {
    const tempOrder = {
      name: item.name,
      id: item.id,
      price: item.price,
      quantity: quantity,
      ownTotal: 0
    };
    tempOrder.ownTotal = tempOrder.price * tempOrder.quantity;
    tempOrder.ownTotal = tempOrder.ownTotal;
    const totalSum = tempOrder.ownTotal + this.state.order.total;
    const newOrder = Object.assign({}, this.state.order, {
      [item.id]: tempOrder
    });

    let total = 0;
    for (let key in newOrder) {
      if (newOrder[key].ownTotal) {
        total = Math.floor(total + newOrder[key].ownTotal);
      }
    }
    total += 2.4;
    newOrder.total = total;
    this.setState({
      order: newOrder,
      showOrder: true
    });
  }

  handleClick(event) {
    const self = this;

    fetch("http://localhost:8080/makeOrder", {
      method: "post",
      body: JSON.stringify(this.state.order),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        fetch(`/order`)
          .then(function(response) {
            return response.json();
          })
          .then(data => {
            self.setState({
              previousOrders: data
            });
          });
      });

    this.setState({
      order: {}
    });
  }

  handleOrder(event) {
    fetch(`/order`)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          previousOrders: data
        });
      });
  }

  handleClose(event) {
    this.setState({
      showOrder: false
    });
  }

  handleDelete(number) {
    const self = this;
    fetch("http://localhost:8080/deleteOrder", {
      method: "delete",
      body: JSON.stringify({ toDelete: number }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        fetch(`/order`)
          .then(function(response) {
            return response.json();
          })
          .then(data => {
            self.setState({
              previousOrders: data
            });
          });
      });
  }

  handleReorder(reorder) {
    const self = this;

    fetch("http://localhost:8080/makeOrder", {
      method: "post",
      body: JSON.stringify(reorder),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        fetch(`/order`)
          .then(function(response) {
            return response.json();
          })
          .then(data => {
            self.setState({
              previousOrders: data
            });
          });
      });
  }
  render() {
    return (
      <div>
        <h2 className="display__title">
          What's Baking?
          <button onClick={this.handleOrder} className="showOldOrders">
            Old Orders
          </button>
          <p className="stoner__quote">
            "People say you can abuse marijuana. Well sh*t, you can abuse
            cheeseburgers too, you know? <br />You don‘t go around closing
            Burger King because you can abuse something." <br />- Joe Rogan,
            pothead
          </p>
        </h2>
        {this.state.showOrder ? (
          <Order
            handleClose={this.handleClose}
            handleClick={this.handleClick}
            order={this.state.order}
          />
        ) : null}
        {Object.keys(this.state.previousOrders).map(oldItem => {
          return (
            <OldOrders
              key={oldItem}
              number={oldItem}
              oldItem={this.state.previousOrders[oldItem]}
              previousOrders={this.state.previousOrders}
              handleDelete={this.handleDelete}
              handleReorder={this.handleReorder}
            />
          );
        })}
        <h3 className="bakers__dozen">Check out the Baked Dozen...</h3>
        {Object.values(this.state.menuItems).map(item => {
          return (
            <MenuItem
              key={item.id}
              item={item}
              receiveOrder={this.receiveOrder}
            />
          );
        })}
      </div>
    );
  }
}

export default Menu;
