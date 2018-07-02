import React from "react";
import Item from "./Item";

class Menu extends React.Component {
  render() {
    return (
      <div className="display">
        <h1 className="display__title">The Menu</h1>
        <form>
          <ul className="display__menuItems">
            {this.props.menuItems.map(item => {
              return (
                <Item
                  item={item}
                  key={item.id}
                  receiveNewQuantity={this.props.receiveNewQuantity}
                  quantity={
                    (this.props.currentOrder[item.id] &&
                      this.props.currentOrder[item.id].quantity) ||
                    0
                  }
                />
              );
            })}
          </ul>
        </form>
      </div>
    );
  }
}

export default Menu;
