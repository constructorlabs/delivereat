import React from 'react';

class Menu extends React.Component {
    constructor(){
        super();
    }
    render() { 
        return (
            <ul>
                {this.props.menuArr.map(item => (
                    <li key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <img src={item.img} />
                    </li>
                ))}
            </ul>
        );
    }
}
 
export default Menu;