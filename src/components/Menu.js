import React from 'react';
import MenuItem from './MenuItem';
import PropTypes from 'prop-types';
import '../styles/Menu.scss';

function Menu({stage,menu,order,addToOrder,removeFromOrder}) {

  return (
    <div className={'menu'}>
      {menu.map(item => <MenuItem stage={stage} key={item.id} order={order} addToOrder={addToOrder} removeFromOrder={removeFromOrder} menuItem={item} />)}
    </div>
  );
}

Menu.propTypes = {
  stage: PropTypes.string.isRequired,
  menu: PropTypes.array.isRequired,
  order: PropTypes.object.isRequired,
  addToOrder: PropTypes.func.isRequired,
  removeFromOrder: PropTypes.func.isRequired
};

export default Menu;