import React from 'react';
import '../styles/menuitem.scss';

const MenuItem = ({ name, price, id, handleMenuItemClick }) => {
  return (
    <li
      className="menu__item"
      onClick={() => handleMenuItemClick(name, price, id)}
    >
      {name}
      <span className="item__price">£{price}</span>
    </li>
  );
};

export default MenuItem;
