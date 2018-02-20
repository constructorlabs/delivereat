'use strict';

const menuJson = require('../data/menu');
const menu = JSON.parse(menuJson);

const [twilioClient, outgoing_number] = initTwilio();

function initTwilio () {
	let twilio_user, twilio_auth_token, outgoing_number;

	if (process.env.twilio_auth_token) {
		twilio_user       = process.env.twilio_user;
		twilio_auth_token = process.env.twilio_auth_token;
		outgoing_number   = process.env.outgoing_number;
	} else {
		const config = require('../config.js');
		twilio_user       = config.twilio_user;
		twilio_auth_token = config.twilio_auth_token;
		outgoing_number   = config.outgoing_number;
	}

	let twilio = require('twilio');
	let twilioClient = new twilio(twilio_user, twilio_auth_token);

	return [ twilioClient, outgoing_number ];
}

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
	let orderData = req.body;

	twilioClient.messages.create({
		body: 'Your order from FoodThing is on its way!',
		to: orderData.userPhone,
		from: outgoing_number
	})
	.then(
		(message) => console.log(`SMS sent: ${message.sid}`)
	)
	.catch(error => {
		console.log(`Couldn't send SMS: ${error}`);
	});


	return res.send({ success : 1 });
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