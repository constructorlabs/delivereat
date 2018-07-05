import React from 'react';
import BasketProduct from './BasketProduct';
import BasketPriceDisplay from './BasketPriceDisplay';
import BasketEmptyMessage from './BasketEmptyMessage';
import SubNavigation from '../navs/SubNavigation';
import BasketCheckoutButton from './BasketCheckoutButton';
import BasketOrderSent from './BasketOrderSent';

function Basket(props) {
    const totalAmount = props.orderAmount + props.deliveryPrice;
    const deliveryPrice = props.deliveryPrice;

    function ordersHandler(dishId, quantity, price, action) {
        props.receiver(dishId, quantity, price, action);
    }

    function oldOrdersHandler() {
        props.oldOrders();
    }

    function checkoutHandler(order) {
        const date = new Date();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes();
        const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds();
        const orderDate = date.toDateString() + ", " + date.getHours() + ":" + minutes + ":" + seconds;
        const orderNew = Object.assign(
            {},
            { products: [order] },
            { orderDate },
            { delivered: false },
            { deliveryPrice: deliveryPrice },
            { totalAmount: totalAmount })

        fetch('/api/order', {
            method: 'post',
            body: JSON.stringify(orderNew),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                props.orderSentReceiver();
                // console.log("Data sent to the server :", data)
            })
            .catch(error => {
                console.log('/api/order', error);
            });
    }


    return (
        <div className="menu menu-wrapper">
            <SubNavigation
                receiverOldOrders={oldOrdersHandler} />

            <h1 className="menu__heading">Basket</h1>
            <div id="menu-container" className="menu-container">

                {/* If order is checked out display "Order placed" message */}
                <BasketOrderSent orderSent={props.orderSent} />

                {/* If basket is empty display "Empty basket" message */}
                <BasketEmptyMessage orders={props.currentOrders} />

                {/* Products display */}
                {Object.keys(props.currentOrders).map(orderKey => {
                    const { dishId, price, qty } = props.currentOrders[orderKey];
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
                    totalAmount={totalAmount}
                    orders={props.currentOrders}
                    orderAmount={props.orderAmount}
                    deliveryPrice={props.deliveryPrice} />

                <BasketCheckoutButton
                    receiverCheckOutHandler={checkoutHandler}
                    orders={props.currentOrders} />
            </div>
        </div>
    )
}

export default Basket;
