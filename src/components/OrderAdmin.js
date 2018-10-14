import React from 'react';
import OrderAdminItem from './OrderAdminItem';

class OrderAdmin extends React.Component {
  constructor(){
    super();
    // this.makePatchOnApi = this.makePatchOnApi.bind(this)
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
         <ul className="menu--settings">
         {Object.keys(this.props.orders).map(order => {
          return <OrderAdminItem
              order={order}
              // key={this.props.orders[orderid]}
            />
         })}
      </ul>
      </section>
      
    )
  }
}

export default OrderAdmin;
