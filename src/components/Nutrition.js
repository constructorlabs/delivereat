import React from "react";
import cx from "classnames";

//Displays additional nutritional values
class Nutrition extends React.Component {
  constructor() {
    super();
    this.state = {
      showNutrition: false
    };

    this.handleClick = this.handleClick.bind(this);
  }
  //Displays nutritional info
  handleClick(event) {
    event.preventDefault();

    this.setState({
      showNutrition: !this.state.showNutrition
    });
  }

  render() {
    const buttonClassSwitch = cx("nutrition", {
      "nutrition--on": this.state.showNutrition == true
    });

    return (
      <div className="dish-nutrition-button">
        <button className="nutrition-button" onClick={this.handleClick}>
          {this.state.showNutrition ? "Close" : "Nutrition"}
        </button>
        <div className={buttonClassSwitch}>
          <p>Fat: {this.props.dish.fat}g</p>
          <p>Carbs: {this.props.dish.carbs}g</p>
          <p>Protein: {this.props.dish.protein}g</p>
          <p>Per {this.props.dish.per}</p>
        </div>
      </div>
    );
  }
}

export default Nutrition;
