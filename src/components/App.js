import React from 'react';

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();
    this.getCourse = this.getCourse.bind(this);
    this.state = {
      menu: {}
    }
  }

  componentDidMount () {
    fetch("/delivereat")
    .then(response => response.json())
    .then(menu => {
      this.setState({
        menu
      })
    })
  }

  getCourse (course) {
    const values = Object.values(this.state.menu);
    return values.filter(item => item.type === course)
    .map(item => {
      return <li key={item.id}>
            {item.name}: £{item.price}  
            <p><img src={item.image}></img></p>
          </li>
    });
  }

  render(){
    return (
      <div>
        <h1>Delivereat app</h1>
        <ul>
          <h2>Starters</h2> {this.state.menu && this.getCourse("starter")}
          <h2>Mains</h2> {this.state.menu && this.getCourse("main")}
          <h2>Desserts</h2> {this.state.menu && this.getCourse("dessert")}
        </ul>
      </div>
    )
  }
}

export default App;