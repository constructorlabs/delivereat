import React from 'react';
import Menu from './Menu';
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.state = {menuItems:[]}
    this.fetch = this.fetch.bind(this)
  }

componentDidMount(){
  this.fetch()
}

fetch(){

  fetch('/api/menu')
  .then(res => res.json())
  .then(body => {
    console.log(body)
    this.setState({menuItems: body})
    console.log(this.state.menuItems);

  })

}

  render(){
    return (
      <div>
        Delivereat app
        <Menu menu={this.state.menuItems} />
      </div>
    )
  }
}

export default App;
