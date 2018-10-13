import React from 'react';
import MenuComponent from "./MenuComponent";

import '../styles/App.scss';


class App extends React.Component {
    constructor() {
      super();
      this.state = {
        menu : [],
        currentOrder: []
      };
      this.getFetch = this.getFetch.bind(this);
      this.addOrder = this.addOrder.bind(this);
    }

    componentDidMount() {
      this.getFetch();
    }

    getFetch() {
     const serverFetch = `http://localhost:8080/menu`

      fetch(serverFetch)
        .then(response => response.json())
        .then(content => {
          this.setState( {
            menu : content
          } )
        }
      );
    }

    addOrder(order) {
      const copyCurrentOrder = [...this.state.currentOrder, order];
      this.setState( {
        currentOrder : copyCurrentOrder
      })
    }

      render() {

        return (

           <div>
           <MenuComponent menu={this.state.menu} addOrder={this.addOrder}/>

           </div>

        )
      }
  }

    export default App;
