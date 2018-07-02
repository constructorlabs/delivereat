import React from 'react';

function BasketEmpty(props) {
    return (
        <div id="basket__empty"
            className={"basket__empty " + (Object.keys(props.orders).length === 0 ? '' : 'disabled')}>
            Nothing in the basket.
                        </div>
    )
}

export default BasketEmpty;