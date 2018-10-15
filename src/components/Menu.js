import React from 'react';

function Menu ({menu, currentOrder, receiveHandleChange, getCurrency}) {
       
    function displayMenuItems (title, course) {
        return <div>
            <h2>{title}</h2>
            { Object.values(menu)
            .filter(item => item.type === course)
            .map(item => {
                return  <div className="menu__item" key={course + "-menu-item-" + item.menuId}> 
                            <img src={item.image}></img>
                            <ul>
                                <li><strong>{item.name}</strong></li>
                                <li>Price: {getCurrencyString(item.price)}</li>
                                <li>Quantity: {createQuantityOptions(item.name, item.menuId)}</li>
                            </ul>
                        </div>
            })}
            {course !== "dessert" && <hr class="title"></hr>}
        </div>
    }

    function createQuantityOptions (name, id) {
        const array = [];
        for (let i=0; i<=10; i++) array.push(i);
        const currentOrderId = currentOrder && currentOrder[id] ? currentOrder[id].quantity : 0;
        return <select 
                  value={currentOrderId}
                  onChange={(event) => handleChange(id, event)} 
                  name={name}
                  id={id}>
          { array.map(item => {
              const keyName = name.toLowerCase().split(" ").join("-");
              return <option value={item} key={keyName + "-option-" + item}>{item}</option> 
          })}
        </select>
    }

    function handleChange (id, event) {
        receiveHandleChange(id, event);
    }
  
    function getCurrencyString (string) {        
        return getCurrency(string);
    }

    return (
        <div>
            {displayMenuItems ("Starters", "starter")}
            {displayMenuItems ("Mains", "main")}
            {displayMenuItems ("Desserts", "dessert")}
        </div>
    )
}

export default Menu;