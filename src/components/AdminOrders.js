import React from "react";
import '../styles/AdminOrders.scss';
import AdminOrdersItem from "./AdminOrdersItem";




class Admin extends React.Component {
    constructor() {
        super();

        this.state={
            adminOrders : {}
        }

        this.handleUpdateOrder = this.handleUpdateOrder.bind(this)

    }

    componentDidMount() {
        this.fetchOrders()
    }

    fetchOrders() {
        fetch("/api/admin/order")
        .then(response => response.json())
        .then(body => {
          this.setState({
            adminOrders: body
          });
          console.log('jsjsjs')
        });
    }

    handleUpdateOrder(orderToUpdate) {
        console.log('update order')
        const orderId = orderToUpdate.id
        fetch(`/api/admin/order/${orderId}`, {
          method: "put",
          body: JSON.stringify({orderToUpdate}),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(function(response) {
            return response.json();
          })
          .then(data => {
            console.log("order update response");
            console.log(data);
            this.fetchOrders()
          });
      }

    render() {
      return (
        <div className="admin-orders">
            <h1>Admin</h1>

            <ul className="order__items">
            {Object.values(this.state.adminOrders).map(order => {
                console.log(order)
                return <AdminOrdersItem handleUpdateOrder={this.handleUpdateOrder} order={order} key={order.id} />
            })}
            </ul>
        </div>
      )
    }
}

export default Admin;