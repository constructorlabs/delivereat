import React from 'react';

class FormInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.props.receiver(name, value);
  }

  render() {
    return (
      <div>
        <label>
          {' '}
          {this.props.label}
          <input
            type="text"
            name={this.props.name}
            onChange={this.handleChange}
            value={this.props.value}
          />
        </label>
      </div>
    );
  }
}

export default FormInput;
