import React from "react";
import "../styles/components/dish.scss";

function Dish({ dish, addToOrder }) {
  return (
    <div className="dish">
      <h4 className="dish__name">{dish.name}</h4>
      <h4 className="dish__price">£{dish.price.toFixed(2)}</h4>
      <button
        className="dish__btn button-quantity"
        onClick={() => addToOrder(dish.dishId, dish.name, dish)}>
        +
      </button>
    </div>
  );
}

export default Dish;
