import React from 'react';
import Menu from './Menu';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        Delivereat App
        <Menu />
      </div>
    )
  }
}

export default App;
