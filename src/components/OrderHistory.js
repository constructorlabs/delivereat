import React from "react";
import OrderHistoryItem from "./OrderHistoryItem";
import OrderHistoryCloseButton from "./OrderHistoryCloseButton";

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.deleteFormItem = this.deleteFormItem.bind(this);
  }

  deleteFormItem(key) {
    this.props.handleClearHistory(key);
  }

  render() {
    const key = Object.keys(this.props.orderhistory);
    return (
      <div className="form">
        <OrderHistoryCloseButton closeWasClicked={this.props.closeWasClicked} />
        <h3>Order History</h3>
        {Object.keys(this.props.orderhistory).map(orderId => {
          return (
            <OrderHistoryItem
              orderhistory={this.props.orderhistory[orderId]}
              id={key}
              orderId={orderId}
              deleteFormItem={this.deleteFormItem}
              // deleteFormItem={this.deleteFormItem}
            />
          );
        })}
      </div>
    );
  }
}

export default OrderHistory;
