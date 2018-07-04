import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Basket from './basket/Basket';
import Search from './Search';
import Menu from './menu/Menu';
import OldOrders from './orders/OldOrders';

function Main() {
    return (
        <Switch>
            <Route exact path="/menu" exact component={() => <Menu james='james' />} />
            <Route exact path="/search" exact component={Search} />
        </Switch>
    )
}

export default Main;