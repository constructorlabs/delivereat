import React from 'react';

function BasketProduct(props) {

    function ordersHandler(dishId, quantity, price, action) {
        props.receiver(dishId, quantity, price, action);
    }

    function increaseQuantityHandler(dishId, price, action) {
        const quantity = props.qty + 1;
        ordersHandler(dishId, quantity, price, action)
    }

    function decreaseQuantityHandler(dishId, price, action) {
        if (props.qty > 0) {
            const quantity = props.qty - 1;
            ordersHandler(dishId, quantity, price, action)
        }
    }

    const { dishId, price, qty } = props;
    const order = {};
    Object.keys(props.menu).forEach(orderKey => {
        if (props.menu[orderKey].id === dishId) {
            Object.assign(order, props.menu[orderKey])
        }
    })
    return (
        <div className="dish">
            <div className="dish__image" style={{ backgroundImage: `url(${order.image})` }}></div>
            <div className="dish__details">
                <h2 className="dish__heading">{order.name}</h2>
                <p className="dish__ingredients">{order.ingredients}.</p>
                <span className="dish__price"><strong>Price: </strong>&pound;{order.price}</span>
                <button onClick={(e) => decreaseQuantityHandler(order.id, order.price, "decrease")}
                    id="dish__quantity-decrease"
                    className={"dish__quantity-decrease " + (qty > 0 ? '' : 'disabled')}>–</button>
                <button onClick={(e) => increaseQuantityHandler(order.id, order.price, "increase")}
                    id="dish__quantity-increase"
                    className="dish__quantity-increase">+</button>
                <div id="dish__quantity-details"
                    className={"dish__quantity-details " + (qty > 0 ? '' : 'disabled')}>
                    {qty} in the basket.
                        </div>
            </div>
        </div>
    )
}

export default BasketProduct;
