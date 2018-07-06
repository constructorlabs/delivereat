import React from 'react';

function BasketOrderSent(props) {
    return (
        <div className={"basket-order__sent " + (props.orderSent === true ? '' : 'hidden')}>
            Order placed.
        </div>
    )
}

export default BasketOrderSent;