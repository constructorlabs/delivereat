import React from 'react';
import Dish from './Dish';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: {},
        }

        this.ordersHandler = this.ordersHandler.bind(this);
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

    render() {
        return (
            <div className="menu menu-wrapper">
                <h1 className="menu__heading">Menu</h1>
                <div id="menu-container" className="menu-container">

                    {Object.keys(this.state.menu).map(dishKey => {
                        const { id, name, price, image, ingredients } = this.state.menu[dishKey];
                        return <Dish
                            key={id}
                            id={id}
                            name={name}
                            price={price}
                            image={image}
                            ingredients={ingredients.join(", ")}
                            receiver={this.ordersHandler} />
                    })}
                </div>
            </div>
        )
    }
}

export default Menu;
