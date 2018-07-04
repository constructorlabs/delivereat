import React from "react";

function MenuItem({ item, showOrder, order, receiveOrder }) {
  function handleChange(event) {
    receiveOrder(item, event.target.value);
  }

  return (
    <form className="display">
      <ul className="display__menu-items">
        <li key={item.id} className="display__menu">
          <h3 className="display__menu-title">{item.name}</h3>
          <p className="specialTag">{item.tag}</p>
          <h3>£{item.price.toFixed(2)}</h3>
          <img className="display__menu-images" src={item.img} />
          <label>
            Quantity
            <input onChange={handleChange} type="number" step="1" min="0" />
          </label>

          <hr />
        </li>
      </ul>
    </form>
  );
}

export default MenuItem;
