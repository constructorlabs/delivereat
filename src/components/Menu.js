import React from 'react';
import Item from './Item';

import "../styles/components/menu.scss";

class Menu extends React.Component {



    render() { 
        return (
            <ul>
                {this.props.menuArr.map(item => (
                    <Item key={item.id} item={item} addToOrder={this.props.addToOrder} removeFromOrder={this.props.removeFromOrder} />
                ))}
            </ul>
        );
    }
}
 
export default Menu;

