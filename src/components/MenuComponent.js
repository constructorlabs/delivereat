import React from "react";
import MenuItem from './MenuItem';

class MenuComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.menu.map( item => {
          return (
            <MenuItem key={item.id} item={item} addOrder={this.props.addOrder}/>);
        })}
      </div>
    );
  }
}

export default MenuComponent;
