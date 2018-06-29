import React from "react";
import Display from "./Display";
import Header from "./Header";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Display />
      </div>
    );
  }
}

export default App;
