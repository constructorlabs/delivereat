import React from 'react';
import MenuItem from './MenuItem';
import '../styles/Menu.scss';

class Menu extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={'menu'}>
        {this.props.menu.map(item => <MenuItem key={item.id} addToOrder={this.props.addToOrder} details={item} />)}
      </div>
    );
  }
}

export default Menu;