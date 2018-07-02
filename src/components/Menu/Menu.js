import React from 'react';
import Dish from './Dish';

function Menu(props) {
    function ordersHandler(dishId, quantity, price, action) {
        props.receiver(dishId, quantity, price, action);
    }
    return (
        <div className="menu menu-wrapper">
            <h1 className="menu__heading">Menu</h1>
            <div id="menu-container" className="menu-container">

                {Object.keys(props.menu).map(dishKey => {
                    const { id, name, price, image, ingredients } = props.menu[dishKey];
                    return <Dish
                        key={id}
                        id={id}
                        name={name}
                        price={price}
                        image={image}
                        ingredients={ingredients.join(", ")}
                        receiver={ordersHandler} />
                })}
            </div>
        </div>
    )
}

export default Menu;