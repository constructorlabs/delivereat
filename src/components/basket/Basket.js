import React from 'react';
import Header from '../Header';
import Search from '../Search';
import BasketProduct from './BasketProduct';
import BasketPriceDisplay from './BasketPriceDisplay';
import BasketEmptyMessage from './BasketEmptyMessage';
import SubNavigation from '../navs/SubNavigation';
import BasketCheckoutButton from './BasketCheckoutButton';

function Basket(props) {
    const totalAmount = props.orderAmount + props.deliveryPrice;
    const deliveryPrice = props.deliveryPrice;

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

        const date = new Date();
        const orderDate = date.toDateString() + ", " + date.getHours() + ":" + date.getMinutes();
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
            .then(function (data) {
                // console.log("Data sent to the server :", data)
            })
            .catch(error => {
                console.log('/api/order', error);
            });
    }


    return (
        <div className="menu menu-wrapper">

            <Header title="Delivereat" />
            <Search />
            <SubNavigation
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
                    totalAmount={totalAmount}
                    orders={props.orders}
                    orderAmount={props.orderAmount}
                    deliveryPrice={props.deliveryPrice} />

                <BasketCheckoutButton
                    receiverCheckOutHandler={checkoutHandler}
                    orders={props.orders} />
            </div>
        </div >
    )
}

export default Basket;
