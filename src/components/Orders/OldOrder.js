import React from 'react';

class OldOrder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 0
        }

        this.ordersHandler = this.ordersHandler.bind(this);
        this.increaseQuantityHandler = this.increaseQuantityHandler.bind(this);
        this.decreaseQuantityHandler = this.decreaseQuantityHandler.bind(this);
    }

    ordersHandler(dishId, quantity, price, action) {
        this.props.receiver(dishId, quantity, price, action);
    }

    increaseQuantityHandler(dishId, price, action) {
        const qty = this.state.quantity + 1;
        this.setState({
            quantity: qty
        })
        this.ordersHandler(dishId, qty, price, action)
    }

    decreaseQuantityHandler(dishId, price, action) {
        if (this.state.quantity > 0) {
            const qty = this.state.quantity - 1;
            this.setState({
                quantity: qty
            })
            this.ordersHandler(dishId, qty, price, action)
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ quantity: props.qty });
    }

    render() {
        const { dishId, price, qty, oldOrders } = this.props;
        const order = {};
        // Object.keys(this.props.menu).forEach(orderKey => {
        //     if (this.props.menu[orderKey].id === dishId) {
        //         Object.assign(order, this.props.menu[orderKey])
        //     }
        // })
        return (
            <div className="dish old-orders">


                {/* {
                    Object.keys(this.props.menu).forEach(orderKey => {
                        if (this.props.menu[orderKey].id === dishId) {
                            Object.assign(order, this.props.menu[orderKey])
                        }
                    })
                } */}
                <div className="dish__details">
                    <h2 className="dish__heading">{order.name}</h2>
                    <p className="dish__ingredients">{order.ingredients}.</p>
                    <div id="dish__quantity-details"
                        className={"dish__quantity-details " + (qty > 0 ? '' : 'disabled')}>
                        {qty} ordered.
                        </div>
                    <span className="dish__price"><strong>Price: </strong>&pound;{order.price}</span>
                    <button id="old-orders__order-again-button">Order again</button>
                </div>
            </div>
        )
    }
}

export default OldOrder;
