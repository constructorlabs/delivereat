import React from 'react';
import BasketProduct from './BasketProduct';
import BasketPriceDisplay from './BasketPriceDisplay';
import BasketEmptyMessage from './BasketEmptyMessage';
import BasketNavigation from '../navs/SubNavigation';

function Basket(props) {

    function ordersHandler(dishId, quantity, price, action) {
        props.receiver(dishId, quantity, price, action);
    }

    function sectionHandler(section) {
        props.receiverOrder(section);
    }

    function oldOrdersHandler(section) {
        sectionHandler(section);
        props.oldOrders();
    }

    function checkoutHandler(order) {
        fetch('/api/order', {
            method: 'put',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log("Data sent to the server :", data)
            })
            .catch(error => {
                console.log('/api/order', error);
            });
    }

    return (
        <div className="menu menu-wrapper">

            <BasketNavigation
                receiverSection={sectionHandler}
                receiverOldOrders={oldOrdersHandler} />

            <h1 className="menu__heading">Basket</h1>
            <div id="menu-container" className="menu-container">
                {/* If basket is empty display message */}
                <BasketEmptyMessage orders={props.orders} />

                {/* Products display */}
                {Object.keys(props.orders).map(orderKey => {
                    const { dishId, price, qty } = props.orders[orderKey];
                    return <BasketProduct
                        key={dishId}
                        dishId={dishId}
                        price={price}
                        qty={qty}
                        receiver={ordersHandler}
                        menu={props.menu} />
                })}

                {/* Price display */}
                <BasketPriceDisplay
                    orders={props.orders}
                    orderAmount={props.orderAmount}
                    deliveryPrice={props.deliveryPrice}
                    receiverCheckOutHandler={checkoutHandler} />
            </div>
        </div >
    )
}

export default Basket;
