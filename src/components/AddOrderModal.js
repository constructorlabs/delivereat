import React from 'react';

import '../styles/AddOrderModal.scss';

class AddOrderModal extends React.Component {
  constructor(){
    super();

    this.state= {
      quantity: 1,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleClick(event) {
    this.props.receiveModalCloseBtn();
    this.setState({
      quantity: 1,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateOrder(this.props.modalDetails.id, this.state.quantity);
    this.props.receiveModalCloseBtn();
    this.setState({
      quantity: 1,
    })
  }

  handleChange(event) {
    this.setState({
      quantity: parseInt(event.target.value, 10),
    })
  }

render(){
  return(
  <div className={this.props.className} id="addOrderModal">
    <div className="modal-content">
      <div className="modal-header">
        <span className="closeBtn" onClick={this.handleClick}>&times;</span>
        <h2>Add to Order</h2>
      </div>
      <div className="modal-body">
        <img src={"/static/"+this.props.modalDetails.photoUrl} />
        <h3>{this.props.modalDetails.description}</h3>
        <form className="itemOrder" onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.quantity} type="number" step="1" max="10" min="1"/>
          <button>Add to Order</button>
        </form>
      </div>
      </div>
    </div>
  )
}

}

export default AddOrderModal
