import React from 'react';
import Search from './Search';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header className="main-header">
                    <h1 className="main-heading">{this.props.title}</h1>
                </header>
                <Search />
            </div>
        )
    }
}
export default Header;