import React from 'react';

class Menu extends React.Component {
    constructor(){
      super();
    
        this.displayMenuItems = this.displayMenuItems.bind(this);
        this.createQuantityOptions = this.createQuantityOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getCurrency = this.getCurrency.bind(this);

      }
      
    displayMenuItems (title, course) {
        const values = Object.values(this.props.menu);
        return <div>
            <h2>{title}</h2>
            <ul className="menu__item"> {
            values.filter(item => item.type === course)
            .map(item => {
                return <li key={course + "-menu-item-" + item.menuId}>
                        <div><img src={item.image}></img></div>
                        <div><strong>{item.name}: {this.getCurrency(item.price)}</strong><br />
                        Quantity: {this.createQuantityOptions(item.name, item.menuId)}</div>
                        </li>
            })}
            </ul>
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
  
    getCurrency (string) {
        this.props.receiveGetCurrency(string);
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