import React from 'react';
import Display from './Display';

class App extends React.Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div>
        Delivereat app
        <Display />
      </div>
    )
  }
}

export default App;
