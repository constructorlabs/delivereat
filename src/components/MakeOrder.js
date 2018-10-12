import React from 'react';
import '../styles/App.scss';
import OrderItem from './OrderItem';

class MakeOrder extends React.Component {
  constructor(){
    super();
    this.renderOrder = this.renderOrder.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.sendOrderToApi = this.sendOrderToApi.bind(this)
  }

  renderOrder() {
    return Object.values(this.props.currentOrder).map(currentorderitem => {
      return <OrderItem
      currentorderitem={currentorderitem} 
      key={currentorderitem.id} 
      />
     })
  }
  
  handleSubmit(event) {
    this.sendOrderToApi();
  }

  sendOrderToApi() {
    fetch("/api/orders", {
      method: "post",
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
    // create array of prices out of currentOrder object;
    let orderKeys = Object.keys(this.props.currentOrder);
    let orderPrices = []
    orderKeys.forEach(key => {
      orderPrices.push(this.props.currentOrder[key].price)
    })
    console.log(`arrPrices ${orderPrices}`)

    // reducer for total
    let totalPrice = orderPrices.reduce((acc, item) => {
      return acc = acc + item; 
    }, 0); 
    let orderPlusDelivery = totalPrice + 2.95;

    return (
      <section>
        <h2>Submit your Order</h2>
        <ul>{this.renderOrder()}</ul>
        <p>Delivery charge: £2.95</p>
        <p>Total: £{orderPlusDelivery}</p>
        <button onClick={this.handleSubmit} type="submit">Go</button>
      </section>
    )
  }
}

export default MakeOrder;
