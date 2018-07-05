import React from 'react';
<<<<<<< HEAD
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
                    oldOrdersReceiver={props.receiverAddOrder}
                />
            })}
        </div>
    )
}
export default OldOrders;
=======
import Order from './Order';

class OldOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: {},
            deliveryPrice: 2.50
        }

        this.ordersHandler = this.ordersHandler.bind(this);
        this.sectionHandler = this.sectionHandler.bind(this);
    }

    componentDidMount() {
        fetch('/api/getorders')
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.setState({
                    menu: result
                })
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    ordersHandler(dishId, quantity, price, action) {
        this.props.receiver(dishId, quantity, price, action);
    }

    sectionHandler(section) {
        this.props.receiverOrder(section);
    }

    render() {
        // console.log("props", this.props);
        return (
            <div className="menu menu-wrapper">
                <h5 onClick={(e) => this.sectionHandler("Menu")} className="menu__back-to-menu">Back to Menu</h5>
                {/* <h5 onClick={this.oldOrdersHandler} className="menu__back-to-menu">Old orders</h5> */}
                <h1 className="menu__heading">Old Orders</h1>
                <div id="menu-container" className="menu-container">
                    {Object.keys(this.props.oldOrders).map(orderKey => {
                        const { dishId, price, qty } = this.props.oldOrders[orderKey];
                        return <Order
                            key={dishId}
                            dishId={dishId}
                            price={price}
                            qty={qty}
                            receiver={this.ordersHandler}
                            menu={this.state.menu} />
                    })}
                </div>
            </div >
        )
    }
}

export default OldOrders;
>>>>>>> 3d6587c540fd9b74707fc66cda39c2960d598af1
