import React from "react";

class OrderHistoryCloseButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.closeWasClicked();
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        className="orderform-history__closebutton"
      >
        X{" "}
      </button>
    );
  }
}

export default OrderHistoryCloseButton;
