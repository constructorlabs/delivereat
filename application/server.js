'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const foodThing = require('./foodthing');
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/../views/partials');

express()
	.use(bodyParser.json())
	.set('view engine', 'hbs')
	.use('/assets', express.static('assets'))
	.get('/',              (req, res) => foodThing.homePage(res))
	.get('/menu',          (req, res) => foodThing.showMenu(res))
	.get('/menuData',      (req, res) => foodThing.menuData(res))
	.post('/submitOrder',  (req, res) => foodThing.submitOrder(req, res))
	.get('/currentOrders', (req, res) => foodThing.currentOrders(res))
	.post('/updateOrder',  (req, res) => foodThing.updateOrder(req, res))
	.listen(8080, () => console.log('Starting FoodThing on port 8080.'));