import React from 'react';
import Dish from './Dish';

class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            menu: {},
        }
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

    render() {
        return (
            <div className="menu menu-wrapper">
                <h1 className="menu__heading">Menu</h1>
                <div id="menu-container" className="menu-container">

                    {Object.keys(this.state.menu).map(dishKey => {
                        const { id, name, price, image, ingredients } = this.state.menu[dishKey];
                        return <Dish
                            key={id}
                            name={name}
                            price={price}
                            image={image}
                            ingredients={ingredients.join(", ")} />
                    })}
                </div>
            </div>
        )
    }
}

export default Menu;
