'use strict';

function homePage (res) {
	res.render('home');
}

function menuData (res) {
	res.json({ data : 'example data' });
}

function submitOrder (req, res) {
	res.send('order submitted');
}

module.exports.homePage    = homePage;
module.exports.menuData    = menuData;
module.exports.submitOrder = submitOrder;