import React from "react";
import "../styles/components/dish.scss";

function Dish({ dish, addToOrder }) {
  return (
    <div className="dish">
      <p className="dish__name">{dish.name}</p>
      <p className="dish__price">£{dish.price.toFixed(2)}</p>
      <button
        className="dish__btn"
        onClick={() => addToOrder(dish.dishId, dish.name)}>
        +
      </button>
    </div>
  );
}

export default Dish;
