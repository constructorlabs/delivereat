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
        <Header
          toggleLogo={this.toggleLogo}
          logoActive={this.state.logoActive}
        />

        <Main toggleLogo={this.toggleLogo} />
        <footer className="footer">
          Baked treats delivered straight to your door!
        </footer>
      </div>
    );
  }
}

export default App;
