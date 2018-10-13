import React from 'react';
import '../styles/App.scss';

class OrderAdmin extends React.Component {
  constructor(){
    super();
    this.makePatchOnApi = this.makePatchOnApi.bind(this)
  }

  makePatchOnApi() {
        fetch("/api/orders", {
        method: "patch",
        body: JSON.stringify(this.props.currentOrder),
        headers: {
            "Content-Type": "application/json"
        }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            // handle response
        });
  }
  
  render(){

    return (
      <section>
        <p>Order ID: <span>New Order</span></p>
        <button>Update order status</button>

      </section>
    )
  }
}

export default OrderAdmin;
