import React from 'react';
import '../styles/Checkout.scss';

function Checkout({changeStage}) {

  return (
    <div className='checkout' onClick={()=>changeStage('menu')}>
      <img className='checkout__image' src="/static/assets/checkout.jpg"></img>
      <p className='checkout__logo'>Zing</p>
      <p className='checkout__text'>Thank you for your order. One of our surprisingly attractive baristas is preparing your coffee now.</p>
    </div>
  );
}

export default Checkout;