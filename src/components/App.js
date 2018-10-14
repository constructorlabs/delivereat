import React from 'react';
import Menu from './Menu';
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.state = {menuItems:[]};
    this.fetch = this.fetch.bind(this);
    this.receiveOrder = this.receiveOrder.bind(this);
    this.postOrder = this.postOrder.bind(this);
  }

componentDidMount(){
  this.fetch()
}

receiveOrder(){
  this.setState();
  postOrder(this.state.order)
}

postOrder(order){

  fetch('http://localhost:8080/api/order', {
    method: 'post',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function(response) {
    return response.json();
  }).then(data => {
    console.log(data)
    // handle response
  });


}

fetch(){

  fetch('/api/menu')
  .then(res => res.json())
  .then(body => {
    console.log(body)
    this.setState({menuItems: body})
    console.log(this.state.menuItems);

  })

}

  render(){
    return (
      <div>
        Delivereat app
        <Menu menu={this.state.menuItems} receiveOrder={this.receiveOrder}/>
        
      </div>
    )
  }
}

export default App;
