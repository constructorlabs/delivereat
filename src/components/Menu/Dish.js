import React from 'react';

function Dish(props) {

    function ordersHandler(dishId, quantity, price, action) {
        props.receiver(dishId, quantity, price, action);
    }

    function increaseQuantityHandler(dishId, price, action) {
        const qty = props.quantity + 1;
        ordersHandler(dishId, qty, price)
    }

    function decreaseQuantityHandler(dishId, price, action) {
        if (quantity > 0) {
            const qty = props.quantity - 1;
            ordersHandler(dishId, qty, price, action)
        }
    }

    const { id, image, name, ingredients, price, quantity } = props;
    return (
        <div className="dish">
            <div className="dish__image" style={{ backgroundImage: `url(${image})` }}></div>
            <div className="dish__details">
                <h2 className="dish__heading">{name}</h2>
                <p className="dish__ingredients">{ingredients}.</p>
                <span className="dish__price"><strong>Price: </strong>&pound;{price}</span>
                <button onClick={(e) => decreaseQuantityHandler(id, price, "decrease")}
                    id="dish__quantity-decrease"
                    className={"dish__quantity-decrease " + (quantity > 0 ? '' : 'disabled')}>–</button>
                <button onClick={(e) => increaseQuantityHandler(id, price, "increase")}
                    id="dish__quantity-increase"
                    className="dish__quantity-increase">+</button>
                <div id="dish__quantity-details"
                    className={"dish__quantity-details " + (quantity > 0 ? '' : 'disabled')}>
                    {quantity} in the basket.
                        </div>
            </div>
        </div>
    )
}

export default Dish;