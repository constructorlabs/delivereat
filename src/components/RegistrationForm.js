import React from 'react';
import FormInput from './FormInput';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.receiver = this.receiver.bind(this);
  }

  validate() {
    const { firstName, lastName, email } = this.state;

    if (!firstName.length) {
      return false;
    }

    if (!lastName.length) {
      return false;
    }

    if (!email.length) {
      return false;
    }

    // dfads@asfdsd.com

    const chunks = email.split('@');

    if (chunks.length !== 2) {
      return false;
    }

    const moreChunks = chunks[1].split('.');

    if (moreChunks.length !== 2) {
      return false;
    }

    return true;
  }

  handleSubmit(event) {
    event.preventDefault();

    const isValid = this.validate();

    if (!isValid) {
      alert('Please check your data');
    } else {
      alert('your order will be processed very soon');
    }
  }

  receiver(name, value) {
    this.setState({
      [name]: value
    });
    const { firstName, lastName, email } = this.state;
    this.props.infoReciever(firstName, lastName, email);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="First name:"
            name="firstName"
            receiver={this.receiver}
            value={this.state.firstName}
          />
          <FormInput
            label="Last name:"
            name="lastName"
            receiver={this.receiver}
            value={this.state.lastName}
          />
          <FormInput
            label="Email:"
            name="email"
            receiver={this.receiver}
            value={this.state.email}
          />
          {/* <button type="submit">Submit</button> */}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
