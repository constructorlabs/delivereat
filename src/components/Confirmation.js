import React from "react";


import "../styles/Confirmation.scss";

class Confirmation extends React.Component {
  constructor() {
    super()
  }


    render(){
      return (
        <div className="orders">
            <p>Thanks for ordering with 90 // 30 Pizza Co.</p>
            <p>We'll cook your pizza in 90 seconds and deliver it within the next 30 minutes. Bella,</p>
        </div>
      )
    }  
}

export default Confirmation;