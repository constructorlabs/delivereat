import React from 'react';
import Header from './Header';
import Menu from './Menu';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app-wrapper">
        <Header title="Delivereat" />
        <Menu />
      </div>
    )
  }
}

export default App;
