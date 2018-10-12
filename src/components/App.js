import React from "react";
import Menu from "./Menu";
import "../styles/App.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <Menu menu={this.state.menu} />;
  }
}

export default App;
