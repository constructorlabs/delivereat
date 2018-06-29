import React from 'react';

class Dish extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { image, name, ingredients, price } = this.props;
        return (
            <div className="dish">
                <div className="dish__image" style={{ backgroundImage: `url(${image})` }}></div>

                {/* <div className="dish__image-wrapper">
                    <img className="dish__image" src={image} alt="" />
                </div> */}
                <div className="dish__details">
                    <h2 className="dish__heading">{name}</h2>
                    <p className="dish__ingredients">{ingredients} </p>
                    {/* <ul className="dish__ingredients">
                        {ingredients.map(ingredient => {
                            return <li className="dish__ingredients--ingredient" key={ingredient}>{ingredient}, </li>
                        })}
                    </ul> */}
                    <span className="dish__price"><strong>Price: </strong>&pound;{price}</span>
                </div>
            </div>
        )
    }
}

export default Dish;
