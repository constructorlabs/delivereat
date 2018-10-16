import React from 'react';
import Menu from './Menu.js'

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div>
        <h1 className="mainHeading">Diabetes</h1>
        <Menu />
      </div>
    )
  }
}

export default App;
