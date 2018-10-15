import React from 'react';
import BasketRemove from './BasketRemove';

class Basket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


  render() {

    return(
      <div>
        {this.props.totalOrder.map( item => {
          return (
            <div>
             <BasketRemove
              key={item.id}
              item={item}
              removeOrder={this.props.removeOrder}
              totalOrder={this.props.totalOrder}
              totalPrice={this.props.totalPrice} />
            </div>
            );
          }
        )
      }
    </div>
  );
}
}
export default Basket;
