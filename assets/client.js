'use strict';

import {
	renderMenu, getItemCount, getMenuData, getOrderTotal
} from './menuBuild.js';

fetchMenuData();

function fetchMenuData () {
	let fetchUrl = '/menuData';

	fetch(fetchUrl)
		.then(response => {
			return response.json()
		})
		.then(menuData => {
			renderMenu(menuData);
		})
		.catch(error => {
			document.write(`Couldn't get ${fetchUrl}: ${error}`);
		});
}

function submitOrder () {
	let totalItems = getItemCount();

	let order = {};

	// To do: see note in createMenuItem() about not using item numbering
	for (let itemNumber = 1; itemNumber <= totalItems; itemNumber++) {
		let identifier = `item-${itemNumber}`;

		let itemQuantity = localStorage[identifier + '-quantity']
			? Number(localStorage[identifier + '-quantity'])
			: 0;

		order[identifier] = itemQuantity;
	}

	let orderData = { order: order };

	// To do: closures for phone number formatting
	let userPhone = document.getElementById('phone-number-input').value;
	userPhone = userPhone.replace(/\D/g, '');
	userPhone = userPhone.replace(/^0/, '+44');
	orderData.userPhone = userPhone;
	orderData.totalPrice = getOrderTotal();

	fetch('/submitOrder', {
		body: JSON.stringify(orderData),
		headers: {
			'content-type': 'application/json'
		},
		method: 'POST',
	})
	.then(response => {
		return response.json();
	})
	.then(json => {
		if (json.success) orderReceived(orderData);
	})
	.catch(error => {
		document.write(`Couldn't submit order: ${error}.`);
	});
}

function orderReceived (orderData) {
	let menu = document.getElementById('menu');

	while (menu.firstChild) {
		menu.removeChild(menu.firstChild);
	}

	let userPhone = orderData.userPhone.replace(/\+44(\d{4})(\d{6})/, '0$1 $2');

	let menuData = getMenuData();

	createPageGroup(
		menu,
		{
			type: 'h1',
			content: 'Order received'
		},
		{
			cssClass: 'confirmation-message',
			content: `Thanks for your order! We've sent a confirmation text to you at ${userPhone}. You're getting:`
		},
		{
			type: 'ul',
			cssId: 'order-list'
		}
	);

	let order = orderData.order;

	Object.keys(order).forEach( orderItem => {
		let itemNumber = orderItem.replace('item-', '');

		if (order[orderItem] == 0) return;
		if (orderItem)

		createPageItem({
			parent: document.getElementById('order-list'),
			type: 'li',
			content: `${order[orderItem]} × ${menuData[itemNumber]}`
		});
	});

	let orderTotal = getOrderTotal().toFixed(2);

	createPageItem({
		parent: menu,
		cssClass: 'confirmation-message',
		content: `Your order total was &pound;${orderTotal}.`
	});
}