import React from 'react';

function BasketPriceDisplay(props) {
    return (
        <div onClick={() => props.receiverCheckOutHandler(props.orders)}
            id="basket__checkout-button"
            className="basket__checkout-button">
            CHECKOUT
        </div>
    )
}

export default BasketPriceDisplay;
