import React from "react";
import OrderFormItem from "./OrderFormItem";

class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { clicked: false };

    this.deleteFormItem = this.deleteFormItem.bind(this);
  }

  deleteFormItem() {
    console.log("Item deleted");
    this.setState({ clicked: true });
  }

  render() {
    return (
      <div className="orderform">
        <h2>Order</h2>
        {this.props.orders.map(item => {
          return (
            <OrderFormItem
              order={item}
              key={item.orderId}
              deleteFormItem={this.deleteFormItem}
            />
          );
        })}
      </div>
    );
  }
}

export default OrderForm;
