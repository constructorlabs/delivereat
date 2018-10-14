import React from 'react';

const MenuItem = ({ name, price, id, handleMenuItemClick }) => {
  return (
    <li className="menu__item" onClick={() => handleMenuItemClick(id)}>
      {name}
      <span className="item__price">£{price.toFixed(2)}</span>
    </li>
  );
};

export default MenuItem;
