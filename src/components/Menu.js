import React from 'react';
import MenuItem from './MenuItem';
import '../styles/menu.scss';

const Menu = ({ menu, handleMenuItemClick }) => {
  return (
    <div className="menu">
      <h2 className="menu__title">All-day Breakfast</h2>
      <ul className="menu__list">
        {menu.map(item => {
          return (
            <MenuItem
              key={item.id}
              name={item.name}
              price={item.price}
              id={item.id}
              handleMenuItemClick={handleMenuItemClick}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
