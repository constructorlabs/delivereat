import React from 'react';
import OrderAdminItem from './OrderAdminItem';

class OrderAdmin extends React.Component {
  constructor(){
    super();
    this.state = {
      orders: {}
    }
    // this.makePatchOnApi = this.makePatchOnApi.bind(this)
    this.fetchOrders = this.fetchOrders.bind(this)
  }

  fetchOrders() {
    const api = "/api/orders/"
    fetch(api)
      .then(response => response.json())
      .then(content => {
        this.setState({orders: content}, () => console.log(this.state.orders))
      })
  }

  componentDidMount() {
    this.fetchOrders();
  }

  // makePatchOnApi() {
  //       fetch("/api/orders", {
  //       method: "patch",
  //       body: JSON.stringify(this.props.currentOrder),
  //       headers: {
  //           "Content-Type": "application/json"
  //       }
  //       })
  //       .then(response => {
  //           return response.json();
  //       })
  // }
  
  render(){

    return (
      <section>
         <h2>Order Admin</h2>
          {Object.keys(this.props.orders).map(order => {
          return (
            <OrderAdminItem
              orders={order}
              key={order.orderid}
            />
          );
        })}
      </section>
    )
  }
}

export default OrderAdmin;
