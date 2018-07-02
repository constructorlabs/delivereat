import React from 'react';
class Order extends React.Component {
constructor(){
    super();
    this.state={total:0}
    this.orderAgain=this.orderAgain.bind(this);
    this.deleteOrder=this.deleteOrder.bind(this);
}

orderAgain(event)
{
  const self=this;
    fetch('http://localhost:8080/api/order', {
        method: 'post',
        body: JSON.stringify(this.props.order),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        self.props.update();
      });
}

deleteOrder(event){

  const self=this;
    fetch('http://localhost:8080/api/delete', {
        method: 'delete',
        body: JSON.stringify({toDelete: this.props.number}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        self.props.update();
      });
    
}

render (){

    return (
        <div className="single_order" >
            <p> {this.props.number} </p>
            {Object.keys(this.props.order).map(key =>{
                {if(key=="total")return}
                
                return (
                    <ul key={key}>x{this.props.order[key].quantity} {this.props.order[key].name}  £{this.props.order[key].price*this.props.order[key].quantity} </ul>
                );
                
            })}
            <p> total: £{this.props.order.total} </p>
            <button className="order_commands reorder" onClick={this.orderAgain}> re-order </button>
            <button className="order_commands x" onClick={this.deleteOrder}> X </button>
            </div>
    );
}

}


export default Order;