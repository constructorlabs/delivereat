import React from 'react';

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>&copy; {year} Delivereat, ltd</p>
        </footer>
    )
}

export default Footer;