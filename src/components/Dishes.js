import React from "react";
import Dish from "./Dish";
import "../styles/components/dishes.scss"

function Dishes({ dishes, addToOrder }) {
  return (
    <div className="dishes">
      {Object.values(dishes).map(dish => (
        <Dish key={dish.id} dish={dish} addToOrder={addToOrder}/>
      ))}
    </div>
  );
}

export default Dishes;
