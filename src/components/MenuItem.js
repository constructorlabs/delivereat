import React from 'react';

function MenuItem ({item, currentOrder, getCurrencyString, receiveHandleChange}) {
    
    function createQuantityOptions (name, id) {
        const array = [];
        for (let i=0; i<=10; i++) array.push(i);
        const currentOrderId = currentOrder && currentOrder[id] ? currentOrder[id].quantity : 0;
        return <select 
                  value={currentOrderId}
                  onChange={(event) => handleChange(id, event)} 
                  name={name}
                  id={id}>
          { array.map(optionItem => {
              return <option value={optionItem} key={name.toLowerCase().split(" ").join("-") + "-option-" + optionItem}>{optionItem}</option> 
          })}
        </select>
    }

    function handleChange (id, event) {
        receiveHandleChange(id, event);
    }
    
    return  (<div className="menu__item"> 
                <img src={item.image}></img>
                <ul>
                    <li><strong>{item.name}</strong></li>
                    <li>Price: {getCurrencyString(item.price)}</li>
                    <li>Quantity: {createQuantityOptions(item.name, item.menuId)}</li>
                </ul>
            </div>)
}

export default MenuItem;