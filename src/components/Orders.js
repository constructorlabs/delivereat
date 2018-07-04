import React from 'react';
import Order from './Order';

class Orders extends React.Component {
constructor(){
    super();
    this.fetchOrders=this.fetchOrders.bind(this);
    this.state={orders:""};
}

fetchOrders(){

    const self=this;
    fetch(`http://localhost:8080/orders`)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
      self.setState({orders:jsonData});
  }).catch(function(error){
    alert("error")
  });
}

componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.update > prevProps.update) {
      this.fetchOrders();
    }
  }


componentWillMount(){
    
   this.fetchOrders();
}

render (){
   
    return (
        <div className="app_orders"> 
            
            
            <div className="orders_history">
                {
                    Object.keys(this.state.orders).map(key =>{
                        
                        return (
                            
                            <Order  key={key} update={this.fetchOrders} number={key} order={this.state.orders[key]} />
                        );
                    })
                }

                </div>
            
            </div>
    );
}

}


export default Orders;