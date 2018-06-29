import React from 'react';
import Search from './Search';
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="main-header">
                <h1 className="main-heading">{this.props.title}</h1>
                <Search />
            </header>
        )
    }
}
export default Header;