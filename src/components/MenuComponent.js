import React from "react";
import MenuItem from './MenuItem';

class MenuComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
        {this.props.menu.map( item => {
          return (
            <li key={item.id}>
              <MenuItem
              item={item}
              addOrder={this.props.addOrder} />
            </li>
          );
        })}
      </ul>
      </div>
    );
  }
}

export default MenuComponent;
