import React from 'react';

class App extends React.Component {
  constructor() {
    super();
  }

  handleMenuReq() {
    fetch('/api/menu')
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        Delivereat App
        <button id="get-menu" onClick={this.handleMenuReq}>Get menu</button>
      </div>
    )
  }
}

export default App;
