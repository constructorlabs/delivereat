import React from 'react';
import BasketCheckoutButton from './BasketCheckoutButton';

function BasketPriceDisplay(props) {
    const totalAmount = props.orderAmount + props.deliveryPrice;
    return (
        <div className={"basket__checkout-button_wrapper " + (Object.keys(props.orders).length > 0 ? '' : '/')}>
            <div>Order: <strong>{props.orderAmount.toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</strong></div>
            <div>Delivery: <strong>{props.deliveryPrice.toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</strong></div>
            <div>Total Amount: <strong>{totalAmount.toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</strong></div>
            <BasketCheckoutButton
                receiverCheckOutHandler={props.receiverCheckOutHandler}
                orders={props.orders} />
        </div>
    )
}

export default BasketPriceDisplay;