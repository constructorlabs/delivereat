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

  categories.forEach(menuCategory => {
    console.log(
      menu.filter(menuItem => {
        return menuItem.category == menuCategory;
      })
    );
  });

  // console.log(
  //   categories.forEach(category => {
  //     return categories[i];
  //   })
  // );

  // console.log(
  //   menu.filter(item => {
  //     return item.category == categories[0];
  //   })
  // );

  return (
    <div className="menu">
      <h2 className="menu__title">All-day Breakfast</h2>
      <dl>
        {categories.map(menuCategory => {
          // console.log(menuCategory);
          return (
            <React.Fragment key={menuCategory}>
              <dt>{menuCategory}</dt>
              <dd>
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
