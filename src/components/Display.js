import React from 'react';

class Display extends React.Component {
  constructor(){
    super();
    this.state = {
      menuItems: []
    }
  }

  componentDidMount(){
    fetch(`/menu`)
    .then(function(response){
      return response.json();
    })
    .then(data => {
      console.log(data);
      this.setState({
        menuItems: Object.values(data)
      });
      console.log(this.state);
    });
  }

  render(){
    return(
      <div className='display'>
        <h1 className='display__title'>The Menu</h1>
        <ul className='display__menuItems'>
        {this.state.menuItems.map(item => {
          return(
            <li key={item.id} className='display__menuItem'>
              <h3 className='display__menuItem-title'>{item.name}</h3>
              <p>£{item.price}</p>
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}

export default Display;