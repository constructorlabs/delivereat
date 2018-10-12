import React from 'react';
import Menu from "./Menu";

import '../styles/App.scss';


class App extends React.Component {
    constructor() {
      super();
    }

    componentDidMount() {
      this.getFetch();
    }

    getFetch() {
     const serverFetch = `http://localhost:8080`

      fetch(serverFetch)
        .then(response => response.json())
        .then(content => {
          console.log(content)
        }
      );
    }

      render() {

        return (

           <div>
            Delivereat app
           </div>

        )
      }
  }

    export default App;
