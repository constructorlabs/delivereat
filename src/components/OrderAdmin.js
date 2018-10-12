import React from 'react';
import '../styles/App.scss';

class OrderAdmin extends React.Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.makePatchOnApi = this.makePatchOnApi.bind(this)
    this.orderStatus = this.orderStatus.bind(this)
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

  orderStatus() {}
  
  render(){

    return (
      <section>
        <button>Submit your Order</button>
      </section>
    )
  }
}

export default OrderAdmin;
