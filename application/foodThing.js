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

function submitOrder (req, res) {
	return res.send('order submitted');
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
module.exports.submitOrder   = submitOrder;
module.exports.currentOrders = currentOrders;
module.exports.updateOrder   = updateOrder;