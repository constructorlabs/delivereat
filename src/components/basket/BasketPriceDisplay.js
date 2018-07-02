import React from 'react';

function BasketPriceDisplay(props) {
    const totalAmount = props.orderAmount + props.deliveryPrice;
    return (
        <div className={"basket__checkout-button_wrapper " + (Object.keys(props.orders).length > 0 ? '' : '/')}>
            <div>Order: <strong>{props.orderAmount.toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</strong></div>
            <div>Delivery: <strong>{props.deliveryPrice.toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</strong></div>
            <div>Total Amount: <strong>{totalAmount.toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</strong></div>
            <div onClick={(e) => props.receiverCheckOutHandler(props.orders)}
                id="basket__checkout-button"
                className="basket__checkout-button">
                CHECKOUT
                        </div>
        </div>
    )
}

export default BasketPriceDisplay;