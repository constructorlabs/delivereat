import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <img className="logo" src="./static/images/munchieslogo-1.jpg" />

      <h1>Baked Delivery</h1>
      <p className="tagline">Never worry about the munchies again</p>

      <nav className="header__nav">
        <ul className="header__links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <b />
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <b />

          <li>
            <Link to="/old-orders">Old Orders</Link>
          </li>
          <b />

          <li>
            <Link to="/portfolio">Contact Information</Link>
          </li>
        </ul>
      </nav>
      <h2 className="display__title">
        What's Baking?
        <p className="stoner__quote">
          "People say you can abuse marijuana. Well sh*t, you can abuse
          cheeseburgers too, you know? <br />You don‘t go around closing Burger
          King because you can abuse something." <br />- Joe Rogan, pothead
        </p>
      </h2>
    </header>
  );
}

export default Header;
