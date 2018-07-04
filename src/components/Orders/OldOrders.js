import React from 'react';
import { Link } from 'react-router-dom';
import OldOrder from './OldOrder';

function OldOrders(props) {
    return (
        <div className="menu-wrapper">
            <Link to="/menu"><h5 className="menu__back-to-menu">Back to Menu</h5></Link>
            {Object.keys(props.oldOrders).map((order, i) => {
                return <OldOrder
                    key={props.oldOrders[order] + Math.random()} // TODO: Fix this properly...
                    date={props.oldOrders[order].orderDate}
                    totalAmount={props.oldOrders[order].totalAmount}
                    products={props.oldOrders[order].products}
                    menu={props.menu}
                />
            })}
        </div>
    )
}
export default OldOrders;