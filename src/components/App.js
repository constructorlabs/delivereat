import React from 'react';
import Header from './Header';
import Menu from './Menu';
// import Basket from './Basket';
import { METHODS } from 'http';
import RegistrationForm from './RegistrationForm';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      items: {},
      currentOrder: {},
      completeOrder: {},
      customer: {
        name: '',
        lastName: '',
        email: ''
      }
    };

    this.orderReceiverplus = this.orderReceiverplus.bind(this);
    this.orderReceiverminus = this.orderReceiverminus.bind(this);
    this.infoReceiver = this.infoReceiver.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/menu')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ items: json });
      })
      .catch(function(error) {
        console.log('fetch error');
      });
  }

  orderReceiverplus(id) {
    const quantity = this.state.currentOrder[id] || 0;
    const newOrder = { [id]: quantity + 1 };
    const currentOrder = Object.assign({}, this.state.currentOrder, newOrder);
    this.setState({ currentOrder });
  }

  orderReceiverminus(id) {
    const quantity = this.state.currentOrder[id];
    if (this.state.currentOrder[id] > 1) {
      const newOrder = { [id]: quantity - 1 };
      const currentOrder = Object.assign({}, this.state.currentOrder, newOrder);
      this.setState({ currentOrder });
    } else if ((this.state.currentOrder[id] = 1)) {
      const currentOrder = Object.assign({}, this.state.currentOrder);
      delete currentOrder[id];
      this.setState({ currentOrder });
    }
  }

  infoReceiver(firstName, lastName, email) {
    this.setState({
      customer: {
        name: firstName,
        lastName: lastName,
        email: email
      }
    });
  }

  handleClick(event) {
    // event.preventDefault()
    const complete = Object.assign(
      {},
      this.state.currentOrder,
      this.state.customer
    );

    console.log(complete);
    this.setState({
      completeOrder: complete
    });

    fetch('http://localhost:8080/api/order', {
      method: 'post',
      body: JSON.stringify(this.state.completeOrder),
      header: {
        'Content-Type': 'application/json'
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return console.log('orders sent');
      })
      .catch(function(error) {
        console.log('post error');
      });
  }

  render() {
    console.log(this.state.customer);
    return (
      <div>
        <Header />
        <div className="menu_container">
          {Object.values(this.state.items).map(item => {
            return (
              <Menu
                key={item.id}
                info={item}
                orderReceiverplus={this.orderReceiverplus}
                orderReceiverminus={this.orderReceiverminus}
              />
            );
          })}
        </div>

        <div className="basket">
          <div className="basketitems">
            <h1>Shopping Basket:</h1>
            {Object.keys(this.state.currentOrder).map(item => {
              return (
                <p key={item}>
                  {this.state.items[item]['name']} quality:{
                    this.state.currentOrder[item]
                  }{' '}
                </p>
              );
            })}
          </div>
          <div className="form">
            <RegistrationForm infoReciever={this.infoReceiver} />
            <form onSubmit={this.handleSubmit}>
              <button onClick={this.handleClick} type="submit">
                submit your order
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
