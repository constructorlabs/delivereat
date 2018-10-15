import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Splash.scss';

function Splash({changeStage}) {

  return (
      <div className='splash' onClick={()=>changeStage('menu')}>
        <p className='splash__logo'>Zing</p>
        <p className='splash__text'>Artisan coffee, delivered to your door</p>
      </div>
    );
}

Splash.propTypes = {
  changeStage: PropTypes.func.isRequired
};

export default Splash;