import React from 'react';

function BasketCheckoutButton(props) {
    return (
        <div className={"basket__checkout-button " + (Object.keys(props.orders).length > 0 ? '' : 'hidden')}
            onClick={() => props.receiverCheckOutHandler(props.orders)}
            id="basket__checkout-button">
            CHECKOUT
        </div>
    )
}

export default BasketCheckoutButton;
