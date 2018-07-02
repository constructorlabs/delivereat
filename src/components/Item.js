import React from 'react';


class Item extends React.Component {
constructor(){
    super();
    this.state={quantity:0, order:{}}
    this.changeHandler=this.changeHandler.bind(this);
    this.addItem=this.addItem.bind(this);
}

changeHandler(event){
    this.setState({quantity:event.target.value});
    
}

addItem(event){
    event.preventDefault();
    if(this.state.quantity>0){
   const order= {name: this.props.item.name, price:this.props.item.price, quantity: this.state.quantity, itemId:this.props.item.id};
   this.props.receiver(order);
   this.setState({quantity:0});

    }
}

render (){
    return (
        <div className="item"> 
        <p> Item: {this.props.item.id} </p>
        <img className="item_img" src={this.props.item.img} />
        <p> {this.props.item.name} </p>
        <p> £{this.props.item.price} </p>
        <form onSubmit={this.addItem}>
            <label> Quantity </label> 
            <input value={this.state.quantity} onChange={this.changeHandler}  />
            <button> Add Items </button>
            </form>
           
        </div>
    );
}

}


export default Item;