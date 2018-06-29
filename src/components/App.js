import React from "react";
import Menu from "./Menu";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: []
    };

    this.returnMenu = this.returnMenu.bind(this);
  }

  returnMenu(result) {
    // const resultArr = Object.values(result);
    const resultArr = Object.keys(result).map(function(item) {
      return result[item];
    });
    this.setState({
      menu: resultArr
    });
    console.log("this.state.menu", this.state.menu);
  }

  render() {
    return (
      <div>
        DeliverEat
        <Menu returnMenu={this.returnMenu} menu={this.state.menu} />
      </div>
    );
  }
}

export default App;
