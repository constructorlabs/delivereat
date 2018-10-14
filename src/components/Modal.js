import React from "react";
//Renders the modal when order is submitted
class Modal extends React.Component {
  onClose(event) {
    this.props.onClose && this.props.onClose(event);
  }

  render() {
    if (!this.props.display) {
      return null;
    }
    return (
      <div className="backdrop">
        <div className="modal">
          {this.props.children}
          <button
            className="confirmation-close-modal"
            onClick={event => this.onClose(event)}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}
export default Modal;
