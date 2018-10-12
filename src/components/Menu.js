import React from "react";

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: []
    };

    this.menuFetch = this.menuFetch.bind(this);
  }

  menuFetch() {
    fetch("api/menu/")
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          menu: data.menu
        });
      });
  }

  componentDidMount() {
    this.menuFetch();
  }

  render() {
    console.log(this.state.menu);
    return (
      <div className="menu">
        <h1>Sides</h1>
        <p>{this.state.menu}</p>
        <p />
      </div>
    );
  }
}

export default Menu;
