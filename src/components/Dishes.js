import React from "react";
import Dish from "./Dish";
import "../styles/components/dishes.scss";

function Dishes({ dishes, addToOrder }) {
  return (
    <div className="dishes">
      <h3 className="dishes__category">{dishes[0].category}</h3>
      {Object.values(dishes).map(dish => (
        <Dish key={dish.dishId} dish={dish} addToOrder={addToOrder} />
      ))}
      <hr />
    </div>
  );
}

export default Dishes;
