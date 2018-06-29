import React from 'react';

class Dish extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { image, name, ingredients, price } = this.props;
        return (
            <div className="dish">
                <div className="dish__addToCart">
                    <span className="dish__addToCart-icon">+</span>Cart
                </div>
                <div className="dish__image" style={{ backgroundImage: `url(${image})` }}></div>
                <div className="dish__details">
                    <h2 className="dish__heading">{name}</h2>
                    <p className="dish__ingredients">{ingredients}.</p>
                    {/* <ul className="dish__ingredients">
                        {ingredients.map(ingredient => {
                            return <li className="dish__ingredients--ingredient" key={ingredient}>{ingredient}, </li>
                        })}
                    </ul> */}
                    <span className="dish__price"><strong>Unit Price: </strong>&pound;{price}</span>
                    <label htmlFor="dish__quantity">
                        {/* <strong>Quantity:</strong> */}
                        <input min="0"
                            placeholder="Quantity"
                            id="dish__quantity"
                            name="dish__quantity"
                            type="number" />
                    </label>
                </div>
            </div>
        )
    }
}

export default Dish;
