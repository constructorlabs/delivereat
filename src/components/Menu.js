import React from "react";
import Item from "./Item";
import Basket from "./Basket";

class Menu extends React.Component {
  render() {
    return (
      <div className="display">
        <div className="display__menu">
          <h1 className="display__menu--title">The Menu</h1>
          <form>
            <ul className="display__menuItems">
              {this.props.menuItems.map(item => {
                return (
                  <Item
                    item={item}
                    key={item.id}
                    receiveNewQuantity={this.props.receiveNewQuantity}
                    receiveInputValue={this.props.receiveInputValue}
                    quantity={this.props.currentOrder[item.id] || 0}
                  />
                );
              })}
            </ul>
          </form>
        </div>
        <Basket
          basketMenuItems={this.props.menuItems}
          currentOrder={this.props.currentOrder}
          quantity={this.props.quantity}
          receiveWipeOrder={this.props.receiveWipeOrder}
        />
      </div>
    );
  }
}

export default Menu;
