import React from 'react';
import MenuItem from './MenuItem';
import '../styles/menu.scss';

const Menu = ({ menu, handleMenuItemClick }) => {
  const categories = menu
    .map(item => {
      return item.category;
    })
    .filter((item, i, array) => {
      return !(i > array.indexOf(item));
    });

  console.log(categories);

  console.log(
    menu.filter(item => {
      return item.category == categories[0];
    })
  );

  return (
    <div className="menu">
      <h2 className="menu__title">All-day Breakfast</h2>
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
      })};
    </div>
  );
};

export default Menu;
