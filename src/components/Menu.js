import React from 'react';
import MenuItem from './MenuItem.js'

function Menu ({menu, getCurrency, currentOrder, receiveHandleChange}) {
       
    function displayMenuItems (title, course) {
        return <div>
            <h2>{title}</h2>
            { Object.values(menu)
            .filter(item => item.type === course)
            .map(item => {
                return <MenuItem
                            key={course + "-menu-item-" + item.menuId} 
                            item={item}
                            receiveHandleChange={(id, event) => receiveHandleChange(item.menuId, event)} 
                            currentOrder={currentOrder}
                            getCurrencyString={getCurrencyString} 
                        />
            })}
            {course !== "dessert" && <hr className="title"></hr>}
        </div>
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