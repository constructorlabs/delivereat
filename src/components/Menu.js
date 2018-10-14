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

  return (
    <div className="menu">
      <h2 className="menu__title">All-day Breakfast</h2>
      <dl>
        {categories.map(menuCategory => {
          return (
            <React.Fragment key={menuCategory}>
              <dt className={`menu__${menuCategory}`}>{menuCategory}</dt>
              <dd className={`menu__${menuCategory}__items`}>
                <ul className="menu__list">
                  {menu
                    .filter(item => {
                      return item.category == menuCategory;
                    })
                    .map(item => {
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
              </dd>
            </React.Fragment>
          );
        })}
      </dl>
    </div>
  );
};

export default Menu;
