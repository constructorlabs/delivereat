import React from "react";

function Header() {
  return (
    <header className="app__header">
      <img src="../../static/DeliverRat-logo.png" className="app__logo" />
      <h1>DeliverRat</h1>
      <Basket
        menuItems={this.props.menuItems}
        currentOrder={this.props.currentOrder}
        quantity={this.props.quantity}
      />
    </header>
  );
}

export default Header;
