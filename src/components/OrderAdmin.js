import React from 'react';
import OrderAdminItem from './OrderAdminItem';
import '../styles/components/orderadmin.scss';


class OrderAdmin extends React.Component {
  constructor(){
    super();
  }
  
  render(){

    return (
      <section className="orderadmin">
         <h2>Order Admin</h2>
         <ul className="menu--settings">
         {Object.keys(this.props.orders).map(order => {
           console.log({order})
          return <OrderAdminItem
              order={order}
              // key={this.props.orders}
            />
         })}
      </ul>
      </section>
      
    )
  }
}

export default OrderAdmin;
