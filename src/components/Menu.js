import React from "react";
import MenuItem from "./MenuItem";
import Order from "./Order";

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      menuItems: {},
      order: {},
      showOrder: false
    };

    this.handleOrder = this.handleOrder.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.receiveOrder = this.receiveOrder.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`/menu-items`)
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

    fetch("/api/orders", {
      method: "post",
      body: JSON.stringify(self.state.order),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        fetch(`/api/orders`)
          .then(function(response) {
            return response.json();
          })
          .then(data => {
            console.log("handleClick");

            self.props.receiveUpdateOrder(data);
          });
      });

    this.setState({
      order: {}
    });

    this.props.toggleLogo();
  }

  handleOrder(event) {
    fetch(`/api/orders`)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("hello");

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

  render() {
    return (
      <div className="display">
        {this.state.showOrder ? (
          <Order
            handleClose={this.handleClose}
            handleClick={this.handleClick}
            order={this.state.order}
          />
        ) : null}

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
