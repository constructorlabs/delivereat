import React from "react";
import Menu from "./Menu";
import Header from "./Header";
import Main from "./Main";

function App() {
  return (
    <div>
      <Header />

      <Main />
      <footer className="footer">
        "High"-street food delivered straight to your sofa!
      </footer>
    </div>
  );
}

export default App;
