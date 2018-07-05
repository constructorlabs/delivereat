import React from "react";
import Menu from "./Menu";
import Header from "./Header";
import Main from "./Main";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      logoActive: false
    };

    this.toggleLogo = this.toggleLogo.bind(this);
  }

  toggleLogo() {
    this.setState({
      logoActive: true
    });
  }

  render() {
    return (
      <div className="app__body">
        <Header logoActive={this.state.logoActive} />

        <Main toggleLogo={this.toggleLogo} />
        <footer className="footer">
          "High"-street food delivered straight to your sofa!
        </footer>
      </div>
    );
  }
}

export default App;
