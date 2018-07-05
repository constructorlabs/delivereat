import React from "react";
import Messages from "./Messages";

function HomePage() {
  return (
    <div className="homepage__display">
      <nav className="homepage__nav">
        <h2 className="homepage__welcome">Wassup bro!</h2>{" "}
        <p className="homepage__welcome-para">
          Welcome to Baked Delivery, the brainchild of munchie conessuire,
          Hamzah Kurdi. Never worry about the munchies again, we deliver a
          variety of budtastic food to meet your needs.
          <br /> <br /> <br />Stay Baked, bro.
        </p>
      </nav>
      <main className="homepage__message-container">
        <h2 className="homepage__message-title">
          Baked at home? Baked at the beach? Baked on a plane? Let us know your
          Baked story below, dude!
        </h2>
        <Messages />
      </main>
    </div>
  );
}

export default HomePage;
