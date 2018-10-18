import React from "react";


import "../styles/ConfirmationMessage.scss";

class ConfirmationMessage extends React.Component {
  constructor() {
    super()
  }


    render(){
      return (
        <div className="confirmation__message">
            <p>Thanks for ordering with 90 // 30 Pizza Co.</p>
            <p>We'll cook your pizza in 90 seconds and deliver it within the next 30 minutes.</p>
            <p>Bella</p>
        </div>
      )
    }  
}

export default ConfirmationMessage;