import React from 'react';
import Main from './Main';

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
                <Main />
            </div>
        )
    }
}
export default Header;