import React from "react";
import OrderMenuItem from "./OrderMenuItem";

function OrderMenu({ menuObject, receiveOrder, formatToMoney, currentOrder, orderMenuClasses }) {
  return (
    <div className={orderMenuClasses}>
      <h1 className="order__menu__title">Order</h1>
      <h2 className="order__menu__title__burger">Burgers</h2>
      {menuObject.burgers.map(item => (
        <OrderMenuItem
          key={item.id}
          extras={menuObject.extras}
          receiveOrder={receiveOrder}
          item={item}
          formatToMoney={formatToMoney}
          currentOrder={currentOrder}
        />
      ))}
      <h2 className="order__menu__title__fries">Fries</h2>
      {menuObject.fries.map(item => (
        <OrderMenuItem
          key={item.id}
          receiveOrder={receiveOrder}
          extras={[]}
          item={item}
          formatToMoney={formatToMoney}
        />
      ))}
    </div>
  );
}

export default OrderMenu;
