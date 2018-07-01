import React from 'react';
import Order from './Order';

class Orders extends React.Component {
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
        fetch('/api/menu')
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
        console.log("props", this.props);
        return (
            <div className="menu menu-wrapper">
                <h5 onClick={(e) => this.sectionHandler("Menu")} className="menu__back-to-menu">Back to Menu</h5>
                <h1 className="menu__heading">Orders</h1>
                <div id="menu-container" className="menu-container">

                    <div id="basket__empty"
                        className={"basket__empty " + (Object.keys(this.props.orders).length === 0 ? '' : 'disabled')}>
                        Nothing in the basket.
                        </div>
                    {Object.keys(this.props.orders).map(orderKey => {
                        const { dishId, price, qty } = this.props.orders[orderKey];
                        return <Order
                            key={dishId}
                            dishId={dishId}
                            price={price}
                            qty={qty}
                            receiver={this.ordersHandler}
                            menu={this.state.menu} />
                    })}
                    <div className={"basket__checkout-button_wrapper " + (Object.keys(this.props.orders).length > 0 ? '' : 'disabled')}>
                        <div>Order: <strong>&pound;{this.props.orderAmount}</strong></div>
                        <div>Delivery: <strong>&pound;{this.state.deliveryPrice}</strong></div>
                        <div>Total Amount: <strong>&pound;{this.props.orderAmount + this.state.deliveryPrice}</strong></div>
                        <div id="basket__checkout-button"
                            className="basket__checkout-button">
                            CHECKOUT
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Orders;
