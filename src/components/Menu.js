import React from 'react';
import '../styles/App.scss';
import MenuItem from './MenuItem';

class Menu extends React.Component {
  constructor(){
    super();

    this.getCourse = this.getCourse.bind(this)
  }

  getCourse(course) {
    return this.props.menu.filter(menuitem => menuitem.category === course)
    .map(menuitem => {
     return <MenuItem 
     menuitem={menuitem} 
     key={menuitem.id} 
     receiveItemOrder={this.props.receiveItemOrder}/>
    })
   };


  render(){
    return (
      <div className="menu">
        {/* <ul>
        {this.props.menu.map(menuitem => {
          return <MenuItem 
          menuitem={menuitem} 
          key={menuitem.id}
          receiveItemOrder={this.props.receiveItemOrder}/>
        })}</ul> */}

        <ul>
          <h2>Starters</h2> {this.getCourse("starter")}
          <h2>Mains</h2> {this.getCourse("main")}
          <h2>Desserts</h2> {this.getCourse("pudding")}
        </ul>

      </div>
    )
  }
}

export default Menu;
