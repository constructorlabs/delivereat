import React from 'react'
import cx from 'classnames'

// import BasketItems from './BasketItems'
class Basket extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      finalPrice: '',
      showOrder: false
      
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchOrder = this.fetchOrder.bind(this)
  }

  componentDidMount(){
    const { order } = this.props;
    let prices = Array.from(order).map(items => items.price);
    let totalPrice = prices.reduce(function(acc, item) {
      return acc + item;
    }, 0);
    let priceWithDelivery = totalPrice + 5.00
    this.setState({
      finalPrice: priceWithDelivery
    });
  }

  fetchOrder(){
    fetch('/order', {
    method: 'post',
    body: JSON.stringify(this.props.order),
    headers: {
      'Content-Type': 'application/json'
    }})
  .then(response => response.json())
  .then(data => {
    alert('Order Confirmation Sent To Email')
    const showOrder = this.props.order
    this.setState({
      showOrder: showOrder,
      button: showOrder ? true : false
    })
  });
  }


  showOrder(){
    
  }



    handleSubmit(){
      this.fetchOrder()
      this.props.sendOrder()
    }

  
  render(){
    let deliveryCharge = 5.00;
    const { order } = this.props;
    let prices = Array.from(order).map(items => items.price);
    let totalPrice = prices.reduce(function(acc, item) {
      return acc + item;
    }, 0);
    let priceWithDelivery = totalPrice + 5.00;
  
      return (
      
        <div className='basket'>
          <h2>Order Status</h2>
          {Object.keys(this.props.order).map(item => {
            return (
                <div className='order'  key={this.props.order[item]}>
                  <h3>{this.props.order[item].item}</h3>
                  <h2>Quantity: {this.props.order[item].quantity}</h2>
                  <h3>£ {this.props.order[item].price.toFixed(2)}</h3>
                </div>
            )
          })}
        <p>Delivery charge: £5.00</p>
          <p>Total: £{priceWithDelivery.toFixed(2)}</p>
          <button onClick={this.handleSubmit} type="submit"> Confirm Order </button>
          {this.state.button && <button>Show My Order</button>}
        </div>
      );
      }
    }
  
  export default Basket;

  //how to send info from display result to basket

  // <BasketItems key={this.props.order.id} order={this.props.order[item]} key={this.props.order[item].id}/>