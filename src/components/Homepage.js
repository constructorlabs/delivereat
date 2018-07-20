import React from "react";
import Messages from "./Messages";

function HomePage() {
  return (
    <div className="homepage__display">
      <nav className="homepage__nav">
        <h2 className="homepage__welcome">Hello!</h2>{" "}
        <p className="homepage__welcome-para">
          Welcome to Baked Delivery, the brainchild of bakery connoisseur,
          Hamzah Kurdi. Feeling peckish? Have a sweet tooth? We deliver a
          variety of fantastic, wholesome baked goods to meet your every need.
          <br /> <br /> <br />Go Do'Nuts and enjoy!
        </p>
      </nav>
      <main className="homepage__message-container">
        <h2 className="homepage__message-title">
          Check out our customer reviews below! We cherish your feedback so
          please leave your own review once we've delivered. And remember,<br />
          A bad review is like baking a cake with all the best ingredients and
          having someone sit on it <br />🍩😜🍩
        </h2>
        <Messages />
      </main>
    </div>
  );
}

export default HomePage;
