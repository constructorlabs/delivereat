import React from "react";


class Basket extends React.Component {
  constructor() {
    super();
     this.basketAdd = this.basketAdd.bind(this);
    this.basketRemove = this.basketRemove.bind(this);
    this.state = {order:{}}
   
  }

  basketAdd(foodItem){
    const newBasket = Object.assign({}, this.state.basket);
    if (this.state.basket[foodItem.id]) {
      newBasket[foodItem.id] += 1
    } else {
      newBasket[foodItem.id] = 1
    }

    this.setState({ basket: newBasket }, () => {
      console.log(this.state);
    })    
  }

  basketRemove(foodItem){
    const newBasket = Object.assign({}, this.props.basket);
    if (this.props.basket[foodItem.id]) {
      newBasket[foodItem.id] -= 1
    } else {
      newBasket[foodItem.id] = 0
    }

    this.props.setState({ basket: newBasket }, () => {
      console.log(this.props.state);
    })
  }




  render() {

    return (
        <div>
            <ul className="basket">

            {Object.entries(this.props.basket).map(([id, quantity]) => 
                <li key={id} >

            
                    <span>{quantity} x {id} </span>
                    {/* {this.props.menu[id]}  */}
                   <button onClick={() => this.basketRemove(id)}>Remove>-</button> 
                    <button>+</button>
                </li>
            )}
                
            </ul>
            <button>Place Order</button>
        </div>

    )
    }
}

export default Basket;