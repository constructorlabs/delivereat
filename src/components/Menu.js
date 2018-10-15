import React from 'react';
import MenuItem from './MenuItem';

class Menu extends React.Component {
  constructor(){
    super();

    this.getCourse = this.getCourse.bind(this)
  }

  getCourse(course) {
    // values = Object.values(this.props.menu);
    // values.map();
    return this.props.menu.filter(menuitem => menuitem.category === course)
    .map(menuitem => {
     return <MenuItem 
     menuitem={menuitem} 
     key={menuitem.id} 
     receiveItemOrder={this.props.receiveItemOrder}
     removeItemOrder={this.props.removeItemOrder} />
    })
   };


  render(){
    return (
      <ul className="menu menu--settings">
          <h2>Drinks</h2> {this.getCourse("drinks")}
          <h2>Cakes</h2> {this.getCourse("cakes")}
          <h2>Breakfast</h2> {this.getCourse("breakfast")}
        </ul>
    )
  }
}

export default Menu;
