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
            <div>
                <h1>Menu</h1>
                <div id="menu-container" className="menu-container">

                    {Object.keys(this.state.menu).map(dish => {
                        return <Dish
                            key={this.state.menu[dish].id}
                            name={this.state.menu[dish].name} />
                    })}
                </div>
            </div>
        )
    }
}

export default Menu;
