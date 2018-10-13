import React from "react";
import ExtrasItem from "./ExtrasItem";

function Extras({ extras, itemId }) {
  return (
    <div className="extras__container">
      {extras.map(extraItem => (
        <ExtrasItem key={(itemId + extraItem.id)} item={extraItem} />
      ))}
    </div>
  );
}

export default Extras;
