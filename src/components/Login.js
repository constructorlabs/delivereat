import React from "react";


import "../styles/ConfirmationMessage.scss";

class Login extends React.Component {
  constructor() {
    super()
  }


    render(){
      return (
        <div className="confirmation__message">
            <p>Login</p>
            <p>Existing customers:</p>
            <form onSubmit={this.props.handleSubmitLogin}>
                <label>Login / Email : <input onChange={this.props.handleChangeLogin}/></label>
                <button type="submit">Login</button>
            </form>
            <p>New customers:</p>
            <form onSubmit={this.props.handleSubmitRegister}>
                <label>Name : <input id="name" onChange={this.props.handleChangeRegister}/></label><br />
                <label>Email : <input id="email" onChange={this.props.handleChangeRegister}/></label><br />
                <label>Telephone : <input id="telephone" onChange={this.props.handleChangeRegister}/></label><br />
                <label>Street Address : <input id="streetAddress" onChange={this.props.handleChangeRegister}/></label><br />
                <label>Town : <input id="town" onChange={this.props.handleChangeRegister}/></label><br />
                <label>Post Code :<input id="postCode" onChange={this.props.handleChangeRegister}/></label><br />
                <label>Delivery Note : <input id="deliveryInfo" onChange={this.props.handleChangeRegister}/></label>
                <button type="submit">Login</button>
            </form>
        </div>
      )
    }  
}

export default Login;