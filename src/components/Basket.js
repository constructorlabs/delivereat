import React from 'react'
import cx from 'classnames';
import BasketItems from './BasketItems'
class Basket extends React.Component {
  constructor(){
    super()

    this.state = {
      finalPrice: '',

    }
  }

  componentDidMount(){

  }




  
  render(){
    const sliderView = cx('hidden', {'orderInfo': this.state.showSlider})
      return (
        <div>
        <BasketItems fetchOrder={this.props.fetchOrder}/>
        <p>Delivery charge: £5.00</p>
          <p>Total: £{this.state.finalPrice}</p>
          <button type="submit"> Confirm Order </button>
        </div>
      );
      }
  }
  
  export default Basket;

  //how to send info from display result to basket