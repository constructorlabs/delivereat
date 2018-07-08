import React from "react";

class Messages extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: {},
      newMess: "",
      newAuthor: ""
    };

    this.quoteChange = this.quoteChange.bind(this);
    this.authorChange = this.authorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`/api/messages`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          messages: data
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    const result = {
      message: this.state.newMess,
      person: this.state.newAuthor
    };
    console.log(result);
    if (
      this.state.newMess.length > 0 &&
      typeof this.state.newMess === "string" &&
      this.state.newAuthor.length > 0 &&
      typeof this.state.newAuthor === "string"
    ) {
      fetch(`/api/messages`, {
        method: "post",
        body: JSON.stringify({ result }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          return fetch(`/api/messages`);
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({
            messages: data
          });
        });
    }
  }

  quoteChange(event) {
    this.setState({
      newMess: event.target.value
    });
  }

  authorChange(event) {
    this.setState({
      newAuthor: event.target.value
    });
  }

  render() {
    setTimeout(() => console.log("Hello"), 4000);
    return (
      <div className="messages__container">
        {Object.keys(this.state.messages).map(newMessage => (
          <React.Fragment>
            <h3 className="message__quote">
              " {this.state.messages[newMessage].message} "
            </h3>
            <p className="message__author">
              -{this.state.messages[newMessage].person}
            </p>
          </React.Fragment>
        ))}
        <form className="messages__form" onSubmit={this.handleSubmit}>
          <input
            className="message__inputs"
            onChange={this.quoteChange}
            type="text"
            name="quote"
            placeholder="Review here"
          />
          <input
            className="message__inputs"
            onChange={this.authorChange}
            type="text"
            name="author"
            placeholder="Name here"
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Messages;
