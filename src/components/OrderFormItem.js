import React from "react";

class OrderFormItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // itemQuantity: 0,
      // price: "",
      // priceOneUnit: "",
      // quantity: ""
    };

    // this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   const { price, quantity } = this.props.order;
  //   const priceOneUnit = price / this.props.order.quantity;
  //   this.setState({
  //     price,
  //     priceOneUnit,
  //     quantity
  //   });
  // }

  // handleClick(event) {
  //   if (event.target.value === "-" && this.state.quantity > 1) {
  //     this.setState({
  //       itemQuantity: this.props.order.quantity - 1,
  //       price: this.state.price - this.state.priceOneUnit,
  //       quantity: this.state.quantity - 1
  //     });
  //   } else if (event.target.value === "+") {
  //     this.setState({
  //       itemQuantity: this.props.order.quantity + 1,
  //       price: this.state.price + this.state.priceOneUnit,
  //       quantity: this.state.quantity + 1
  //     });
  //   }
  // }

  handleSubmit(event) {
    event.preventDefault();
    this.props.deleteFormItem(this.props.order.orderId);
  }

  render() {
    return (
      <div className="orderformitem">
        <h3>{this.props.order.item}</h3>
        <h4>x {this.props.order.quantity}</h4>
        <h4>£{this.props.order.price}</h4>
        <form onSubmit={this.handleSubmit}>
          {/* <input onClick={this.handleClick} type="button" value="-" />
          <input onClick={this.handleClick} type="button" value="+" /> */}
          <button type="submit">Delete</button>
        </form>
      </div>
    );
  }
}

export default OrderFormItem;
