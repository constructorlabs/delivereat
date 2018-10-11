import React from 'react';
import Menu from './Menu'

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      menuArr: []
    }
  }

  componentDidMount(){
    fetch('api/menu')
    .then(response => response.json())
    .then(body=>this.setState({menuArr:body}))
  }

  render(){
    return (
      <div>
        <button>Feed Me!</button>
        <Menu menuArr={this.state.menuArr}/>
      </div>
    )
  }
}

export default App;
