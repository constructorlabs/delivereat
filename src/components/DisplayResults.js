import React from 'react';

import cx from 'classnames';


class DisplayResults extends React.Component {
  constructor(){
    super()
    this.state = {
       quantity: 0 ,//has to start with 0 quantity
       itemPrice: '',
       
    }
    this.adjustQuantity = this.adjustQuantity.bind(this)
  }

      adjustQuantity(event){
        (event.target.value === '-' && this.state.quantity > 0) ? this.setState({quantity: this.state.quantity - 1}) : 
        (event.target.value === "+") ? this.setState({quantity: this.state.quantity + 1}) : 0
      }


      sendOrderInfo(){ // to basket

      }


      handleSubmit(event){
        event.preventDefault()
        
      }

  render(){
    return (
      <div>
        <h3>{this.props.menuItems.title}</h3>
        <p>{this.props.menuItems.category}</p>
        <img src={`./static/images/${this.props.menuItems.image}`} alt={this.props.menuItems.description}/>      
        <p>Price: £{this.props.menuItems.price.toFixed(2)}</p>
        <form>
           <input type='text' value={this.state.quantity}/>
           <input onClick={this.adjustQuantity}type="button" value="-" />
           <input onClick={this.adjustQuantity} type="button" value="+" />
           <input  onClick={this.handleSubmit}type='submit' value='Add To Basket'/>
        </form>
      </div>
    );
  }
}

export default DisplayResults;







{/* //Slider view details */}
{/* <div className={sliderView}> */}
   {/* <h4 className="closer" onClick={this.closeSliderFunction}>X</h4> */}
   {/* <h1>Your Food Basket...</h1>
     {Object.values(this.state.basket).map(basketItem =>{
       return <div key={basketItem.id}>
       <h4>{basketItem.title}</h4>
       <img src={`./static/images/${this.props.menuItems.image}`}/>
        <p>Quantity: {basketItem.quantity}</p>  */}

        {/* <input onClick={this.adjustQuantity}type='button' value='+'></input>
        <input onClick={this.adjustQuantity}type='button' value='-'></input>
        <p>Order Total:</p>
        <button onSubmit={this.handleSubmit}>Confirm Order</button>
       </div>
     })} 
</div>          */}


// const sliderView = cx('hidden', {'orderInfo': this.state.showSlider})

// handleClick(event){
//   let object = Object.assign({}, this.state.basket, {
//   [this.props.menuItems.id]:{
//     id:this.props.menuItems.id, 
//     title: this.props.menuItems.title,
//     quantity: this.state.basket[this.props.menuItems.id] ? this.state.basket[this.props.menuItems.id].quantity + 1 : 1,
//     description: this.props.menuItems.description, 
//     price: this.props.menuItems.price
//   }
//   })
// this.setState({
//   basket: object,
//   showSlider: true
// })