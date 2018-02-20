'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const foodThing = require('./foodThing');
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/../views/partials');

const port = process.env.PORT || 8080;

express()
	.use( bodyParser.json() )
	.set(  'view engine', 'hbs' )
	.use(  '/assets',        express.static('assets') )
	.get(  '/',              foodThing.showMenu       )
	.get(  '/menuData',      foodThing.menuData       )
	.get(  '/currentOrders', foodThing.currentOrders  )
	.post( '/submitOrder',   foodThing.receiveOrder   )
	.post( '/updateOrder',   foodThing.updateOrder    )
	.listen(port, () => console.log(`Starting FoodThing on port ${port}.`));
