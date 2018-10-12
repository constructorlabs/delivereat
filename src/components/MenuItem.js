import React from 'react';

const MenuItem = ({ name, price, handleMenuItemClick }) => {
  return (
    <li className="menu__item" onClick={() => handleMenuItemClick(name, price)}>
      {name}
      <span className="item__price">£{price}</span>
    </li>
  );
};

export default MenuItem;
