import React from 'react';
import DisplayResults from './DisplayResults'

function MenuResults({menu, getOrder}) {
  const menuKeys = Object.values(menu)
    return (
      <div>
        <h1>Menu</h1>
          <ul className='menu__items'>
            {menuKeys.map(menuItems => <DisplayResults getOrder={getOrder} key={menuItems.id} menuItems={menuItems}/>)}
          </ul>
      </div>
    );
}

export default MenuResults;


