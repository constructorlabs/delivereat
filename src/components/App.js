import React from 'react';
import Menu from './Menu';
import Orders from './Orders';


class App extends React.Component {
  constructor(){
    super();
    this.state={update:1};
    this.updateOrders=this.updateOrders.bind(this);
    
  }

  showMenu(event){
    document.querySelector(".app_menu").style.display="block"
    document.querySelector(".app_orders").style.display="none"
  }

  updateOrders(){
    this.setState({update: this.state.update+1})

  }

  showHistory(event){
    document.querySelector(".app_menu").style.display="none"
    document.querySelector(".app_orders").style.display="block"
  }



  render(){
    return (
      <div>
        <header className="header"> 

        <h1 className="title"> Caffeine++ </h1>
          <h2> Our Coffee Machine is Always Working </h2> 
            <img className="header_img" src="./static/images/mach.jpg" />
            <br/>
            <button className="toggle" onClick={this.showMenu}> Menu </button>
        <button className="toggle" onClick={this.showHistory}> Order History </button>
          </header>
        <Menu receiver={this.updateOrders} />
        <Orders update={this.state.update}  />
      </div>
    )
  }
}

export default App;
