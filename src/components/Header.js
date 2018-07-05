import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header className="app__header">
        <img src="../../static/rabbit.png" className="app__logo" />
        <h1>DeliverRabbit</h1>
      </header>
    );
  }
}

export default Header;
