import React from 'react';

class Menu extends React.Component {
    constructor(){
      super();
    
        this.displayMenuItems = this.displayMenuItems.bind(this);
        this.createQuantityOptions = this.createQuantityOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getCurrencyString = this.getCurrencyString.bind(this);

    }
      
    displayMenuItems (title, course) {
        return <div>
            <h2>{title}</h2>
            { Object.values(this.props.menu)
            .filter(item => item.type === course)
            .map(item => {
                return  <div className="menu__item" key={course + "-menu-item-" + item.menuId}> 
                            <img src={item.image}></img>
                            <ul>
                                <li><strong>{item.name}</strong></li>
                                <li>Price: {this.getCurrencyString(item.price)}</li>
                                <li>Quantity: {this.createQuantityOptions(item.name, item.menuId)}</li>
                            </ul>
                        </div>
            })}
        </div>
    }

    createQuantityOptions (name, id) {
        const array = [];
        for (let i=0; i<=10; i++) array.push(i);
        return <select 
                  value={this.props.currentOrder ? this.value : ""}
                  onChange={(event) => this.handleChange(id, event)} 
                  name={name}
                  id={id}>
          { array.map(item => {
              const keyName = name.toLowerCase().split(" ").join("-");
              return <option value={item} key={keyName + "-option-" + item}>{item}</option> 
          })}
        </select>
    }

    handleChange (id, event) {
        this.props.receiveHandleChange(id, event);
    }
  
    getCurrencyString (string) {        
        return this.props.getCurrency(string);
    }

    render () {
        return (
            <div>
                {this.displayMenuItems ("Starters", "starter")}
                {this.displayMenuItems ("Mains", "main")}
                {this.displayMenuItems ("Desserts", "dessert")}
            </div>
        )
    }
}

export default Menu;