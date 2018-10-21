import React from "react";
import '../styles/AdminOrders.scss';
import AdminOrdersItem from "./AdminOrdersItem";




class Admin extends React.Component {
    constructor() {
        super();

        this.state={
            adminOrders : {}
        }

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

    render() {
      return (
        <div className="admin-orders">
            <h1>Admin</h1>

            <ul className="order__items">
            {Object.values(this.state.adminOrders).map(order => {
                console.log(order)
                return <AdminOrdersItem order={order}  />
            })}
            </ul>
        </div>
      )
    }
}

export default Admin;