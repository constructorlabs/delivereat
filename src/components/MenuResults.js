import React from 'react';
import DisplayResults from './DisplayResults'

function MenuResults({menu, fetchOrder}) {
  const menuKeys = Object.values(menu)
    return (
      <div>
          <ul>
            {menuKeys.map(menuItems => <DisplayResults fetchOrder = {fetchOrder} key={menuItems.id} menuItems={menuItems}/>)}
          </ul>
      </div>
    );
}

export default MenuResults;


