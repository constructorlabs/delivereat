import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer className="app__footer">
        <img src="../../static/rabbit.png" className="app__logo--footer" />
        <p>Powered by Waffles</p>
      </footer>
    );
  }
}

export default Footer;
