import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="main-header">
                <h1 className="main-heading">{this.props.title}</h1>
            </header>
        )
    }
}
export default Header;