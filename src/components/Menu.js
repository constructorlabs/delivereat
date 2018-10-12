import React from "react";
import App from "./App";


class Menu extends React.Component {
  constructor() {
    super();

  }



  render() {

  
    return (
     <div>
      <ul className="menu">
       {this.props.menu.map((foodItems, index) => {
          return(
          <li key={foodItems.id}>
          <h1>{foodItems.name}</h1>
          <img src={foodItems.image}/>
          </li>
          )
       })}
       
      </ul>

      </div>


    );
    }
}

export default Menu;