import React from 'react';
import Item from './Item';
let orderCounter=0;
class Menu extends React.Component {
    constructor(){
        super();
        this.state={menu:[], order:{}, total:0, orderId:1};
        this.getOrder=this.getOrder.bind(this);
        this.submitOrder=this.submitOrder.bind(this);
        
    }
    componentWillMount(){
    const self=this;
    fetch(`http://localhost:8080/menu`)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    
      self.setState({menu:jsonData});
  }).catch(function(error){
    alert("error")
  });

  
    }

    

    getOrder(order){
       let isThere=false;
        let targetKey="";
        for (let key in this.state.order){
            if(order.itemId== this.state.order[key].itemId){
                isThere=true;
                targetKey=key;
            }
        }
        
        if(isThere){
            
          const more=  Number(this.state.order[targetKey].quantity) + Number(order.quantity);
          let total = this.state.total + order.quantity*order.price;
          this.setState({total: total});
          const tempOrder= this.state.order;
          tempOrder[targetKey].quantity=more;
          tempOrder.total=total;
         this.setState({order:tempOrder});

        }
        else{
            let id= `item${this.state.orderId}`
            this.state.orderId++;
            let myOrder = {[id]: order};

            const allOrders = Object.assign({},this.state.order,myOrder);
            const currentTotal= order.price * order.quantity;
            const myTotal= this.state.total+currentTotal
      allOrders.total=myTotal;

             this.setState({total: myTotal});
            this.setState({order : allOrders});
           
        document.querySelector(".charge").style.display="block";
        }
    }


    submitOrder(event){
        if(this.state.orderId>1){
            const self=this;
            this.setState({orderId:1});
        
        fetch('http://localhost:8080/api/order', {
    method: 'post',
    body: JSON.stringify(this.state.order),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    self.props.receiver();
  });

  this.setState({order:[], total:0});
  document.querySelector(".charge").style.display="none";
}
  }

 

    render (){
        return (
            <div className="app_menu" >
        
            <div className="menu">
                {this.state.menu.map(item =>{ 
                    return(
                    <Item receiver={this.getOrder} key={item.id} item={item} />
                    )
                })}
                <br/>
                   </div>

                <br/>
            <div className="current_order"> Current Order: {Object.keys(this.state.order).map(key =>{
                        {if(key=="total")return}
                     return (
                <p key={this.state.order[key].itemId}> x{this.state.order[key].quantity}
                : {this.state.order[key].name}  £{this.state.order[key].price*this.state.order[key].quantity}
                 </p>
            )
        })}
            <br/>
            <p> Total: £{this.state.total} <label className="charge"> + £{this.state.total/20}  delivery charge </label> </p>
           <button onClick={this.submitOrder}> Submit Order! </button>
            </div>



                </div>
        );
    }


}


export default Menu;