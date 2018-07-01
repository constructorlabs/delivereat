import React from 'react';

class Order extends React.Component {
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
        const { dishId, price, qty } = this.props;
        const order = {};
        Object.keys(this.props.menu).forEach(orderKey => {
            if (this.props.menu[orderKey].id === dishId) {
                Object.assign(order, this.props.menu[orderKey])
            }
        })
        return (
            <div className="dish">
                <div className="dish__image" style={{ backgroundImage: `url(${order.image})` }}></div>
                <div className="dish__details">
                    <h2 className="dish__heading">{order.name}</h2>
                    <p className="dish__ingredients">{order.ingredients}.</p>
                    <span className="dish__price"><strong>Price: </strong>&pound;{order.price}</span>
                    <button onClick={(e) => this.decreaseQuantityHandler(order.id, order.price, "decrease")}
                        id="dish__quantity-decrease"
                        className={"dish__quantity-decrease " + (qty > 0 ? '' : 'disabled')}>–</button>
                    <button onClick={(e) => this.increaseQuantityHandler(order.id, order.price, "increase")}
                        id="dish__quantity-increase"
                        className="dish__quantity-increase">+</button>
                    <div id="dish__quantity-details"
                        className={"dish__quantity-details " + (qty > 0 ? '' : 'disabled')}>
                        {qty} in the basket.
                        </div>
                </div>
            </div>
        )
    }
}

export default Order;
