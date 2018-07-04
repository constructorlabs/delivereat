import React from "react";
import OrderHistoryItem from "./OrderHistoryItem";

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.orderhistory);
    return (
      <div className="form">
        <h3>Order History</h3>
        {Object.keys(this.props.orderhistory).map(item => {
          return (
            <OrderHistoryItem
              item={item}
              order={this.props.orderhistory[item]}
              key={this.props.orderhistory[item].id}
              // deleteFormItem={this.deleteFormItem}
            />
          );
        })}
      </div>
    );
  }
}

export default OrderHistory;
