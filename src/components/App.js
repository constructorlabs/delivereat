import React from "react";
import Menu from "./Menu";

function App() {
  return (
    <div>
      <header className="header">
        <img className="logo" src="./static/images/munchieslogo-1.jpg" />

        <h1>Baked Delivery</h1>
        <p className="tagline">Never worry about the munchies again</p>
      </header>
      <Menu />
      <footer className="footer">
        "High"-street food delivered straight to your sofa!
      </footer>
    </div>
  );
}

export default App;
