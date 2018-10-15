import React from "react";
import MenuItem from './MenuItem';

class MenuComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <ul className="menucomponent_ul">
        {this.props.menu.map( item => {
          return (
            <li className="menucomponent_li">
              <MenuItem
              key={item.id}
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
