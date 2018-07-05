import React from 'react';
import { Link } from 'react-router-dom';
import OldOrder from './OldOrder';

function OldOrders(props) {
    return (
        <div className="menu-wrapper">
            <Link to="/menu"><h5 className="menu__back-to-menu">Back to Menu</h5></Link>
            <h1 className="menu__heading">Order History</h1>
            <div className={"old-orders__empty " + (Object.keys(props.oldOrders).length > 0 ? "hidden" : "")}>
                No order history</div>
            {Object.keys(props.oldOrders).map(order => {
                return <OldOrder
                    key={props.oldOrders[order] + Math.random()} // TODO: Fix this properly...
                    date={props.oldOrders[order].orderDate}
                    totalAmount={props.oldOrders[order].totalAmount}
                    products={props.oldOrders[order].products}
                    order={order}
                    menu={props.menu}
                    receiverDeletedOrder={props.receiverDeletedOrder}
                />
            })}
        </div>
    )
}
export default OldOrders;