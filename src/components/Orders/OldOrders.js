import React from 'react';
import OldOrder from './OldOrder';

function OldOrders(props) {
    function sectionHandler(section) {
        props.receiverSection(section);
    }
    return (
        <div className="menu-wrapper">
            <h5 onClick={() => sectionHandler("Menu")} className="menu__back-to-menu">Back to Menu</h5>
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