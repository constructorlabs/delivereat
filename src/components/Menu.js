import React from "react";
import MenuItem from "./MenuItem";

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  fetchMenu() {
    fetch("http://localhost:8080/api/menu")
      .then(response => response.json())
      .then(result => {
        this.props.returnMenu(result);
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.fetchMenu();
  }

  render() {
    return (
      <div className="menu">
        <title>Menu</title>
        {this.props.menu.map(item => {
          return (
            <MenuItem
              menu={item}
              key={item.id}
              getOrder={this.props.getOrder}
            />
          );
        })}
      </div>
    );
  }
}

export default Menu;
