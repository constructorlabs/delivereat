import React from "react";
import Menu from "./Menu";
import "../styles/App.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="grid">
        <div className="header">
          <h1>Deliver-Eat</h1>
        </div>
        <div className="menu">
          <h2 className="menu-text">
            <u>Menu</u>
          </h2>
          <Menu />
        </div>
      </div>
    );
  }
}

export default App;
