import React from "react";

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemQuantity: 0,
      orderId: 0,
      price: ""
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event) {
    if (event.target.value === "-" && this.state.itemQuantity > 0) {
      this.setState({
        itemQuantity: this.state.itemQuantity - 1
      });
    } else if (event.target.value === "+") {
      this.setState({
        itemQuantity: this.state.itemQuantity + 1
      });
    }
  }

  createOrder() {
    let orderId = this.props.menu.id;
    orderId = `${orderId}.${this.state.orderId}`;
    this.state.orderId++;
    let price = this.props.menu.price * this.state.itemQuantity;
    const order = {
      item: this.props.menu.name,
      id: this.props.menu.id,
      price: price,
      quantity: this.state.itemQuantity,
      orderId: orderId
    };
    this.props.getOrder(order);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.itemQuantity <= 0) {
      alert(
        "โปรดเลือกรายการที่จะสั่งซื้อ || Please select an item to place an order"
      );
    } else {
      this.createOrder();
      this.setState({ itemQuantity: 0 });
    }
  }

  render() {
    return (
      <div className="menuitem">
        <h2>{this.props.menu.name}</h2>
        <img
          className="menuitem__image"
          src={this.props.menu.img}
          alt={this.props.menu.name}
        />
        <h3>£{this.props.menu.price}</h3>
        <h3>({this.props.menu.type})</h3>
        <div className="quantitybutton">
          <form onSubmit={this.handleSubmit}>
            <input type="text" size="5" value={this.state.itemQuantity} />
            <input onClick={this.handleClick} type="button" value="-" />
            <input onClick={this.handleClick} type="button" value="+" />
            <button type="submit">Add to Order</button>
          </form>
        </div>
      </div>
    );
  }
}

export default MenuItem;
