import React from 'react';

function BasketPriceDisplay(props) {
    return (
        <div className={"basket__checkout-button_wrapper " + (Object.keys(props.orders).length > 0 ? '' : 'hidden')}>
            <div>Order: <strong>{props.orderAmount.toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</strong></div>
            <div>Delivery: <strong>{props.deliveryPrice.toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</strong></div>
            <div>Total Amount: <strong>{props.totalAmount.toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</strong></div>
        </div>
    )
}

export default BasketPriceDisplay;