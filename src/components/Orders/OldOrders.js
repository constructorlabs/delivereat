import React from 'react';
import OldOrder from './OldOrder';

class OldOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: {},
            oldOrders: {},
            deliveryPrice: 2.50
        }

        this.ordersHandler = this.ordersHandler.bind(this);
        this.sectionHandler = this.sectionHandler.bind(this);
    }

    componentDidMount() {
        fetch('/api/getorders')
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.setState({
                    oldOrders: result
                })
                return result;
            })
            .catch(error => {
                console.log(error);
            });

        fetch('/api/menu')
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.setState({
                    oldOrders: result
                })
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    ordersHandler(dishId, quantity, price, action) {
        this.props.receiver(dishId, quantity, price, action);
    }

    sectionHandler(section) {
        this.props.receiverOrder(section);
    }

    render() {
        const dishId = 1;
        const price = 5;
        const qty = 2;
        // console.log("props", this.props);
        return (
            <div className="menu menu-wrapper">
                <h5 onClick={(e) => this.sectionHandler("Menu")} className="menu__back-to-menu">Back to Menu</h5>
                {/* <h5 onClick={this.oldOrdersHandler} className="menu__back-to-menu">Old orders</h5> */}
                <h1 className="menu__heading">Old Orders</h1>
                <div id="menu-container" className="menu-container">
                    {/* {Object.keys(this.props.oldOrders).map(orderKey => {
                        const { dishId, price, qty } = this.props.oldOrders[orderKey];
                        return  */}
                    <OldOrder
                        key={dishId}
                        dishId={dishId}
                        price={price}
                        qty={qty}
                        receiver={this.ordersHandler}
                        menu={this.state.menu}
                        oldOrders={this.props.oldOrders} />
                    {/* })} */}
                </div>
            </div >
        )
    }
}

export default OldOrders;
