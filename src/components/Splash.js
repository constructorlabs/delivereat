import React from 'react';
import '../styles/Splash.scss';

class Splash extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.changeStage('menu');
  }

  render() {
    return (
      <div className='splash' onClick={this.handleClick}>
        <img className='splash__image' src="/static/assets/splash.jpg"></img>
        <p className='splash__logo'>Zing</p>
        <p className='splash__text'>Artisan coffee, delivered to your door</p>
      </div>
    );
  }
}

export default Splash;