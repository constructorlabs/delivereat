'use strict';

const menuJson = require('../data/menu');
const menu = JSON.parse(menuJson);

function homePage (req, res) {
	return res.render('home');
}

function menuData (req, res) {
	return res.json(menu);
}

function showMenu (req, res) {
	return res.render('menu');
}

function receiveOrder (req, res) {
	console.log(req.body);
	return res.send({response : 'order received'});
}

function currentOrders (req, res) {
	return res.send('current orders');
}

function updateOrder (req, res) {
	return res.send('update order');
}

module.exports.homePage      = homePage;
module.exports.menuData      = menuData;
module.exports.showMenu      = showMenu;
module.exports.receiveOrder  = receiveOrder;
module.exports.currentOrders = currentOrders;
module.exports.updateOrder   = updateOrder;