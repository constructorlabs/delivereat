import React from 'react';

function OldOrder(props) {
    const { date, totalAmount, products, menu, order, receiverDeletedOrder } = props;

    const reorderHandler = () => {
        const date = new Date();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes();
        const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds();
        const orderDate = date.toDateString() + ", " + date.getHours() + ":" + minutes + ":" + seconds;

        fetch('/api/orders')
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                const orderNew = data[order];
                orderNew.orderDate = orderDate;
                return fetch('/api/order', {
                    method: 'post',
                    body: JSON.stringify(orderNew),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            })
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                props.oldOrdersReceiver(data);
                // console.log("Data sent to the server :", data)
            })
            .catch(error => {
                console.log('/api/order', error);
            });
    }

    const deleteOldOrderHandler = (id) => {
        const url = '/api/order/' + id;
        fetch(url, {
            method: 'post',
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                receiverDeletedOrder(data);
            })
            .catch(error => {
                console.log('/api/order/:id', error);
            });
    }
    return (
        <div className="old-order">
            <div>On {date}h you ordered:</div>
            <div className="old-order__products">
                <ul>{
                    products.map((product) => {
                        return Object.keys(product).map(item => {
                            return <li key={menu[item].name}>
                                {/* <span>ID: {order}</span> */}
                                <h2 className="dish__heading">{product[item].qty} {menu[item].name}</h2>
                            </li>
                        })
                    })
                }
                </ul>
            </div>
            <div>Amount: <strong>{totalAmount.toLocaleString('en-gb', { style: 'currency', currency: 'GBP' })}</strong></div>
            <div className="old-order__re-order-wrapper">
                <button
                    onClick={() => reorderHandler(order)}
                    className="old-order__re-order">Re-order</button>
                <button
                    onClick={() => deleteOldOrderHandler(order)}
                    className="old-order__delete">Delete</button>
            </div>

        </div >
    )
}

export default OldOrder;