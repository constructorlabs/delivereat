import React from 'react';

class Dish extends React.Component {
    constructor() {
        super();

        this.state = {
            quantity: 0
        }

        this.ordersHandler = this.ordersHandler.bind(this);
        this.quantityHandler = this.quantityHandler.bind(this);
    }

    ordersHandler(dishId, quantity) {
        this.props.receiver(dishId, quantity);
    }

    quantityHandler(e, dishId) {
        this.setState({
            quantity: e.target.value
        })
        this.ordersHandler(dishId, e.target.value)
    }

    increaseItemHandler(dishId) {
        const qty = this.state.quantity + 1;
        this.setState({
            quantity: qty
        })
        this.ordersHandler(dishId, qty)
    }
    decreaseItemHandler(dishId) {
        if (this.state.quantity > 0) {
            const qty = this.state.quantity - 1;
            this.setState({
                quantity: qty
            })
            this.ordersHandler(dishId, qty)
        }
    }

    render() {
        const { id, image, name, ingredients, price } = this.props;
        return (
            <div className="dish">
                <div className="dish__image" style={{ backgroundImage: `url(${image})` }}></div>
                <div className="dish__details">
                    <h2 className="dish__heading">{name}</h2>
                    <p className="dish__ingredients">{ingredients}.</p>
                    <span className="dish__price"><strong>Price: </strong>&pound;{price}</span>
                    <button onClick={(e) => this.decreaseItemHandler(id)}
                        id="dish__quantity-decrease"
                        className={"dish__quantity-decrease " + (this.state.quantity > 0 ? '' : 'disabled')}>–</button>
                    <button onClick={(e) => this.increaseItemHandler(id)}
                        id="dish__quantity-increase"
                        className="dish__quantity-increase">+</button>
                    <div id="dish__quantity-details"
                        className={"dish__quantity-details " + (this.state.quantity > 0 ? '' : 'disabled')}>
                        {this.state.quantity} in the basket.
                        </div>

                </div>
            </div>
        )
    }
}

export default Dish;
