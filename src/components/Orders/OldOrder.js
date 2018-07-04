import React from 'react';

function OldOrder(props) {
    const { date, totalAmount, products, menu } = props;
    return (
        <div className="old-order">
            <div>On {date}h you ordered:</div>
            <div className="old-order__products">
                <ul>{
                    products.map((product) => {
                        return Object.keys(product).map(item => {
                            return <li key={menu[item].name}>
                                <h2 className="dish__heading">{product[item].qty} {menu[item].name}</h2>
                            </li>
                        })
                    })
                }
                </ul>
            </div>
            <div>Amount: <strong>{totalAmount.toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</strong></div>
            <div className="old-order__re-order-wrapper">
                <button className="old-order__re-order">Re-order</button>
            </div>

        </div >
    )
}

export default OldOrder;