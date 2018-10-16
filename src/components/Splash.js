import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import '../styles/Splash.scss';

function Splash({changeStage}) {

  return (
    <CSSTransitionGroup
      transitionName="splash"
      transitionAppear={true}
      transitionAppearTimeout={1000}
      transitionEnter={false}
      transitionLeave={true}
      transitionLeaveTimeout={1000}>
      <div className='splash' onClick={()=>changeStage('menu')}>
        <p className='splash__logo'>Zing</p>
        <p className='splash__text'>Artisan coffee, delivered to your door</p>
      </div>
    </CSSTransitionGroup>
    );
}

Splash.propTypes = {
  changeStage: PropTypes.func.isRequired
};

export default Splash;