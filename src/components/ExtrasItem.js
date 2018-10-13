import React from 'react';

function ExtrasItem({ extraItem }) {

    return (
        <div className="extras__item">
            <label className="extras__item__name">{extraItem.name}: </label>
        </div>
    )
}

export default ExtrasItem;