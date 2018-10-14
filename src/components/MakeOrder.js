import React from 'react';
import '../styles/components/makeorder.scss';
import MakeOrderItem from './MakeOrderItem';

class MakeOrder extends React.Component {
  constructor(){
    super();
    this.renderOrder = this.renderOrder.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.sendOrderToApi = this.sendOrderToApi.bind(this)
  }

  renderOrder() {
    return Object.values(this.props.currentOrder).map(currentorderitem => {
      return <MakeOrderItem
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
   
   // reducer for total
    let totalPrice = orderPrices.reduce((acc, item) => {
      return acc = acc + item; 
    }, 0); 
    let orderPlusDelivery = totalPrice + 2.95;
    
    return (
      <section className="customerOrder">
        <h2 className="customerOrder__title">Your Order</h2>
        <ul className="customerOrder__order menu--settings">{this.renderOrder()}
        <li>Delivery charge &pound;2.95</li>
        <li>Total: &pound;{orderPlusDelivery}</li>
        </ul>
        <button className="customerOrder__submit" onClick={this.handleSubmit} type="submit">Place order</button>
      </section>
    )
  }
}

export default MakeOrder;
