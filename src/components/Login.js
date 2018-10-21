import React from 'react';

import "../styles/components/login.scss";

class Login extends React.Component {
    constructor(){
        super ();
        
        this.state = {
            customer: {},
            customerOld:{},
            name: "",
            address: "",
            email: "",
            mobile: '',
            password: '',
            emailOld: '',
            passwordOld: ''
          }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitOld = this.handleSubmitOld.bind(this);
    }
    
    handleChange(e) {
        this.setState({
          [e.target.name] : e.target.value
        });
      }


      handleSubmit(e) {
        e.preventDefault();
        this.setState({
            customer: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email,
                mobile: this.state.mobile,
                password: this.state.password
            },
            name: '',
            address: '',
            email: '',
            mobile: '',
            password: ''
        }, () => this.props.addCustomer(this.state.customer))

    }
    
      handleSubmitOld(e) {
        e.preventDefault();
        this.setState({
            customerOld: {
                emailOld: this.state.email,
                passwordOld: this.state.password
            },
            emailOld: '',
            passwordOld: ''
        }, () => this.props.retrieveCustomer(this.state.customerOld))
        
        
      }

    render() { 
        return ( 
            <React.Fragment>
            <form className="existingUser">
                <h2>Returning customer:</h2>
                <label className='email'>Email:</label>
                <input className='emailInput' 
                    onChange={this.handleChange} name="emailOld" 
                    type="email" 
                    value={this.state.emailOld} />
                <label className='password'>Password:</label>
                <input className='passwordInput'            onChange={this.handleChange}            name="passwordOld" 
                    type="password" 
                    value={this.state.passwordOld} />
                <button onClick={this.handleSubmitOld}>Place my order!</button>
            </form>
            <form className="register">
                <h2>New customer:</h2>
                <label className='name'>Full Name:</label>
                <input className='nameInput' 
                    onChange={this.handleChange} name="name" 
                    type="text" value={this.state.name} />
                <label className='address'>Address:</label>
                <input className='addressInput'             onChange={this.handleChange}            name="address" 
                    type="text" 
                    value={this.state.address}/>
                <label className='email'>Email:</label>
                <input className='emailInput' 
                    onChange={this.handleChange} name="email" 
                    type="email" 
                    value={this.state.email} />
                <label className='mobile'>Mobile:</label>
                <input className='mobileInput'              onChange={this.handleChange}            name="mobile" 
                    type="number" 
                    value={this.state.mobile} />
                <label className='password'>Password:</label>
                <input className='passwordInput'  
                      onChange={this.handleChange} name="password" 
                      type="password" 
                      value={this.state.password} />
                <button onClick = {this.handleSubmit}>Place my order!</button>
            </form>
            </React.Fragment>
         );
    }
}
 
export default Login;