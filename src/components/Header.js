import React from "react";
import { Link } from "react-router-dom";

function Header({ toggleLogo, logoActive }) {
  return (
    <header className="header">
      <img
        onClick={toggleLogo}
        className={logoActive ? "logo" : "logo__null"}
        src="./static/images/bakery-logo-edit.png"
      />

      <h1>Baked Delivery</h1>
      <p className="tagline">Treat Yourself and Go Do'NUTS!</p>

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
        </ul>
      </nav>
      <h2 className="display__title">
        What's Baking?
        <p className="stoner__quote">
          "Baking may be regarded as a science, but it's the chemistry between
          the ingredients and the cook that gives desserts life. <br />Baking is
          done out of love, to share with family and friends, to see them
          smile."
          <br />- Anna Olsen, Baker
        </p>
      </h2>
    </header>
  );
}

export default Header;
