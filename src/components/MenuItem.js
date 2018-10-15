import React from 'react';

function MenuItem ({item, getCurrencyString, createQuantityOptions}) {
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