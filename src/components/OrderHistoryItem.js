import React from "react";

class OrderHistoryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleDelete = this.handleDelete.bind(this);
    this.handleReorder = this.handleReorder.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.deleteFormItem(this.props.orderId);
  }

  sendOrder() {
    fetch("/api/order", {
      method: "post",
      body: JSON.stringify(this.props.orderhistory),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.ok ? response.json() : Promise.reject(response);
      })
      .catch(error => console.log(error));
  }

  handleReorder(event) {
    this.sendOrder();
  }

  render() {
    return (
      <div className="order-history-item">
        {this.props.orderhistory.map(orderItem => {
          return (
            <p>
              {orderItem.item} x {orderItem.quantity}.....£{orderItem.price}
            </p>
          );
        })}
        <form onSubmit={this.handleReorder}>
          <button type="submit">Order Again</button>
        </form>
        <form onSubmit={this.handleDelete}>
          <button type="submit">Delete Order</button>
        </form>
      </div>
    );
  }
}

export default OrderHistoryItem;
