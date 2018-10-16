import React from "react";
import "../styles/Food.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faMinus);

class DisplayFood extends React.Component {
  constructor() {
    super();


    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleAddClick(event) {
    this.props.receiveAddClick(this.props.food.name);

  }

  handleRemoveClick(event) {
    this.props.receiveRemoveClick(this.props.food.name);

  }

  render() {
    const imageLink = `../../static/${this.props.food.name}.jpg`;

    return (
      <div className="food">
        <h2>{this.props.food.name}</h2>
        <img src={imageLink} />
        <p>
          {this.props.food.price.toLocaleString("en-UK", {
            style: "currency",
            currency: "GBP"
          })}
        </p>
        {this.props.order.find(item => item.name == this.props.food.name) ? (
          <p type="button" onClick={this.handleRemoveClick}>
            Remove from chart
          </p>
        ) : (
          <p type="button" onClick={this.handleAddClick}>
            Add to chart
          </p>
        )}

      </div>
    );
  }
}

export default DisplayFood;
