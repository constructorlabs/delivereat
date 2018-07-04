import React from 'react';
import Header from '../Header';
import Search from '../Search';
import BasketProduct from './BasketProduct';
import BasketPriceDisplay from './BasketPriceDisplay';
import BasketEmptyMessage from './BasketEmptyMessage';
import SubNavigation from '../navs/SubNavigation';
import BasketCheckoutButton from './BasketCheckoutButton';

class Basket extends React.Component {

    constructor(props) {
        super(props)
        this.state({
            totalAmount: this.props.orderAmount + this.props.deliveryPrice,
            deliveryPrice: this.props.deliveryPrice,
        })
    }

    ordersHandler(dishId, quantity, price, action) {
        this.props.receiver(dishId, quantity, price, action);
    }

    sectionHandler(section) {
        this.props.receiverOrder(section);
    }

    oldOrdersHandler(section) {
        this.sectionHandler(section);
        this.props.oldOrders();
    }

    checkoutHandler(order) {
        const date = new Date();
        const orderDate = date.toDateString() + ", " + date.getHours() + ":" + date.getMinutes();
        const orderNew = Object.assign(
            {},
            { products: [order] },
            { orderDate },
            { delivered: false },
            { deliveryPrice: deliveryPrice },
            { totalAmount: totalAmount })

        fetch('/api/order', {
            method: 'post',
            body: JSON.stringify(orderNew),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log("Data sent to the server :", data)
            })
            .catch(error => {
                console.log('/api/order', error);
            });
    }

    render() {
        return (
            <div className="menu menu-wrapper">

                <Header title="Delivereat" />
                <Search />
                <SubNavigation
                    receiverSection={sectionHandler}
                    receiverOldOrders={oldOrdersHandler} />

                <h1 className="menu__heading">Basket</h1>
                <div id="menu-container" className="menu-container">
                    {/* If basket is empty display message */}
                    <BasketEmptyMessage orders={this.props.orders} />

                    {/* Products display */}
                    {Object.keys(this.props.orders).map(orderKey => {
                        const { dishId, price, qty } = this.props.orders[orderKey];
                        return <BasketProduct
                            key={dishId}
                            dishId={dishId}
                            price={price}
                            qty={qty}
                            receiver={ordersHandler}
                            menu={this.props.menu} />
                    })}

                    {/* Price display */}
                    <BasketPriceDisplay
                        totalAmount={totalAmount}
                        orders={this.props.orders}
                        orderAmount={this.props.orderAmount}
                        deliveryPrice={this.props.deliveryPrice} />

                    <BasketCheckoutButton
                        receiverCheckOutHandler={this.checkoutHandler}
                        orders={this.props.orders} />
                </div>
            </div >
        )
    }
}

export default Basket;
