import React from 'react';
import '../styles/components/makeorder.scss';
import MakeOrderItem from './MakeOrderItem';

function MakeOrder({ currentOrder, sendOrderToApi }) {
  
  function renderOrder() {
    return Object.values(currentOrder).map(currentorderitem => {
      return <MakeOrderItem
      currentorderitem={currentorderitem} 
      key={currentorderitem.id} 
      />
     })
  }

  // create array of prices out of currentOrder object;
    let orderKeys = Object.keys(currentOrder);
    let orderPrices = []
    orderKeys.forEach(key => {
      orderPrices.push(currentOrder[key].price)
    })
   
   // reducer for total
    let totalPrice = orderPrices.reduce((acc, item) => acc = acc + item, 0); 
    let orderPlusDelivery = totalPrice + 2.95;
    
    return (
      <section className="customerOrder">
        <h2 className="customerOrder__title">Your Order</h2>
        <ul className="customerOrder__order menu--settings">{renderOrder()}
        <li>Delivery charge &pound;2.95</li>
        <li>Total: &pound;{orderPlusDelivery}</li>
        </ul>
        <button className="customerOrder__submit" onClick={sendOrderToApi} type="submit">Place order</button>
      </section>
    )
  }
export default MakeOrder;
