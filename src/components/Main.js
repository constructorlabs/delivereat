import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Basket from './basket/Basket';
import Search from './Search';

function Main() {
    return (
        <Switch>
            <Route exact path="/Basket" exact component={Basket} />
            <Route exact path="/mymenu" exact component={Search} />
        </Switch>
    )
}

export default Main;