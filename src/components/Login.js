import React from "react";


import "../styles/ConfirmationMessage.scss";

function Login({handleSubmitLogin, handleChangeLogin, handleSubmitRegister, handleChangeRegister}) {
      return (
        <div className="confirmation__message">
            <p>Login</p>
            <p>Existing customers:</p>
            <form onSubmit={handleSubmitLogin}>
                <label>Login / Email : <input onChange={handleChangeLogin}/></label>
                <button type="submit">Login</button>
            </form>
            <p>New customers:</p>
            <form onSubmit={handleSubmitRegister}>
                <label>Name : <input id="name" onChange={handleChangeRegister}/></label><br />
                <label>Email : <input id="email" onChange={handleChangeRegister}/></label><br />
                <label>Telephone : <input id="telephone" onChange={handleChangeRegister}/></label><br />
                <label>Street Address : <input id="streetAddress" onChange={handleChangeRegister}/></label><br />
                <label>Town : <input id="town" onChange={handleChangeRegister}/></label><br />
                <label>Post Code :<input id="postCode" onChange={handleChangeRegister}/></label><br />
                <label>Delivery Note : <input id="deliveryInfo" onChange={handleChangeRegister}/></label>
                <button type="submit">Login</button>
            </form>
        </div>
      )
    }  

export default Login;