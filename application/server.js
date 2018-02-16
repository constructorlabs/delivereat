'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const foodThing = require('./foodThing');
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/../views/partials');

express()
	.use( bodyParser.json() )
	.set(  'view engine', 'hbs' )
	.use(  '/assets',        express.static('assets') )
	.get(  '/',              foodThing.showMenu       )
	.get(  '/menuData',      foodThing.menuData       )
	.get(  '/currentOrders', foodThing.currentOrders  )
	.post( '/submitOrder',   foodThing.submitOrder    )
	.post( '/updateOrder',   foodThing.updateOrder    )
	.listen(8080, () => console.log('Starting FoodThing on port 8080.'));