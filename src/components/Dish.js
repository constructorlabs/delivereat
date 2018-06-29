import React from 'react';

class Dish extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dish">
                <h2>{this.props.name}</h2>
                <span className="dish__price"><strong>Price: </strong>{this.props.price}</span>
                <img className="dish__image" src={this.props.image} />
                <ul className="dish__ingredients">
                    {this.props.ingredients.map(ingredient => {
                        return <li key={ingredient}>{ingredient}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Dish;
