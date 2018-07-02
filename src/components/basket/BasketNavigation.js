import React from 'react';

function BasketNavigation(props) {

    function sectionHandler(section) {
        props.receiverSection(section);
    }

    function oldOrdersHandler(section) {
        props.receiverOldOrders(section);
    }

    return (
        <div className="basket__options">
            <h5 onClick={(e) => sectionHandler("Menu")} className="menu__back-to-menu">Back to Menu</h5>
            <h5 onClick={(e) => oldOrdersHandler("OldOrders")} className="menu__back-to-menu">Old orders</h5>
        </div>
    )
}
export default BasketNavigation;