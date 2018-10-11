import React from 'react';

import '../styles/App.scss';

class App extends React.Component {
  constructor() {
    super();
  }

  // React code is running in the browser

  // create a fetch to a relative path eg. fetch("/api/menu") not "localhost:8080/api/menu" to the internal API from the endpoints defined in server.js  eg /Menu  /Order  etc

  componentDidMount() {
    fetch('/api/menu')
      .then(response => response.json())
      .then(body => console.log(body));
  }

  render() {
    return <div>Delivereat app</div>;
  }
}

export default App;
