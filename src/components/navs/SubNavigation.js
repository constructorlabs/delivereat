import React from 'react';
import { Link } from 'react-router-dom';

function BasketNavigation(props) {

    function oldOrdersHandler() {
        props.receiverOldOrders();
    }

    return (
        <div className="basket__options">
            <Link to="/menu"><h5 className="menu__back-to-menu">Back to Menu</h5></Link>
            <Link to="/old-orders"><h5 onClick={oldOrdersHandler} className="menu__back-to-menu">Order History</h5></Link>
        </div>
    )
}
export default BasketNavigation;