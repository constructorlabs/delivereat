import React from 'react';


class Navigation extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.props.receivePageChange(event.target.id)
    }

    render() {
        return (
            <nav className="nav__bar">
                <ul className="nav__bar__list">
                    <li className="nav__bar__item__dummy">Home</li>
                    <li className="nav__bar__item__dummy">About</li>
                    <li className="nav__bar__item__dummy">Locations</li>
                    <li className="nav__bar__item" id="menu" onClick={this.handleClick} >Menu</li>
                    <li className="nav__bar__item" id="order" onClick={this.handleClick} >Order</li>
                    <li className="nav__bar__item__dummy">Contact</li>
                </ul>
            </nav>
        )
    }
}


export default Navigation;