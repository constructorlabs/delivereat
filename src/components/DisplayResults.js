import React from 'react';
import cx from 'classnames';


class DisplayResults extends React.Component {
  constructor(){
    super()
    this.state = {
        basket: {},
        showSlider: false,
       
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeSliderFunction = this.closeSliderFunction.bind(this)
    // this.addQuantity = this.addQuantity.bind(this)
  }

  closeSliderFunction(){
    this.setState({
        showSlider:false
    })
}

    handleClick(event){
      let object = Object.assign({}, this.state.basket, {
      [this.props.menuItems.id]:{
        id:this.props.menuItems.id, 
        title: this.props.menuItems.title,
        quantity: this.state.basket[this.props.menuItems.id] ? this.state.basket[this.props.menuItems.id].quantity + 1 : 1,
        description: this.props.menuItems.description, 
        price: this.props.menuItems.price
      }
      })
    this.setState({
      basket: object,
      showSlider: true
    })
    }

      adjustQuantity(event){
        if (event.target.value === "-" && this.state.basket.quantity > 0) {
           this.state.basket.quantity - 1
        } else if (event.target.value === "+") {
          this.state.quantity + 1
        }
      }

      // confirmOrder(){
        
      // }

      handleSubmit(){
        // this.setState({

        // })
          this.props.fetchOrder(this.state.basket)
      }


  render(){
    const sliderView = cx('hidden', {'orderInfo': this.state.showSlider})
    return (
      <div>
         <h3>{this.props.menuItems.title}</h3>
         <img src={`./static/images/${this.props.menuItems.image}`}/>
         <p>£{this.props.menuItems.price}</p>
         <button onClick={this.handleClick}>Add to Basket</button>


        {/* //Slider view details */}
        <div className={sliderView}>
            {/* <h4 className="closer" onClick={this.closeSliderFunction}>X</h4> */}
            <h1>Your Food Basket...</h1>
              {Object.values(this.state.basket).map(basketItem =>{
                return <div key={basketItem.id}>
                <h4>{basketItem.title}</h4>
                <img src={`./static/images/${this.props.menuItems.image}`}/>
                 <p>Quantity: {basketItem.quantity}</p> 

                 <input onClick={this.adjustQuantity}type='button' value='+'></input>
                 <input onClick={this.adjustQuantity}type='button' value='-'></input>
                 <p>Order Total:</p>
                 <button onSubmit={this.handleSubmit}>Confirm Order</button>
                </div>
              })} 
        </div>             
      </div>
    );
  }
}

export default DisplayResults;

