'use strict';

getMenuData();

const menuFuncs = menuItemFuncs();

function getMenuData () {
	let fetchUrl = 'http://localhost/menuData';

	fetch(fetchUrl)
		.then(response => {
			return response.json()
		})
		.then(json => {
			renderMenu(json);
		})
		.catch(error => {
			document.write(`Couldn't get ${fetchUrl}: ${error}`);
		});
}

function menuItemFuncs () {
	let itemCount = 0;

	const funcs = {
		incrementItemCount () {
			itemCount++;
			return itemCount;
		},
		itemCount () {
			return itemCount;
		}
	}

	return funcs;
}

function createPageItem (args) {
	let parent         = args.parent;
	let itemType       = args.type || 'div';
	let itemId         = args.cssId;
	let itemClass      = args.cssClass;
	let itemContent    = args.content;
	let itemListener   = args.listener;
	let dataAttributes = args.dataAttributes;

	let item = document.createElement(itemType);

	if (parent)         parent.appendChild(item);
	if (itemId)         item.setAttribute('id', itemId);
	if (itemClass)      item.setAttribute('class', itemClass);
	if (itemContent)    item.innerHTML = itemContent;
	if (dataAttributes) {
		for (const [key, value] of Object.entries(dataAttributes)) {
			item.setAttribute(`data-${key}`, value);
		}
	}

	if (itemListener) {
		let event = itemListener.event;
		let func = itemListener.func;
		item.addEventListener(event, func);
	}

	return item;
}

function renderMenu (data) {
	let menu = document.getElementById('menu');
	let menuGroups = data.groups;

	Object.keys(menuGroups).forEach(group => {
		createMenuGroup(group, menuGroups)
	});

	createTotals(menu, menuFuncs.itemCount());

	let phoneNumberForm = createPageItem({
		parent: menu,
		type: 'form',
		cssId: 'phone-number-form'
	});

	let phoneNumberInput = createPageItem({
		parent: phoneNumberForm,
		type: 'input',
		cssId: 'phone-number-input',
	});

	phoneNumberInput.setAttribute('type', 'text');
	phoneNumberInput.setAttribute('value', '07000 000000');

	let submitOrderButton = createPageItem({
		parent: menu,
		type: 'button',
		cssId: 'submit-order',
		content: 'Place order',
		listener: {
			event: 'click',
			func: () => { submitOrder() }
		}
	});

	updateDisplayTotal(); // with values loaded into quantity pickers
}

function createMenuGroup (group, menuGroups) {
	let groupDiv = createPageItem({
		parent: menu,
		cssId: `group-${group.toLowerCase()}`,
		cssClass: 'menu-group'
	});

	let groupTitle = createPageItem({
		parent: groupDiv,
		type: 'h2',
		content: group,
	});

	let currentGroup = menuGroups[group];

	Object.keys(currentGroup).forEach(menuItem => {
		menuFuncs.incrementItemCount();
		let currentItem = currentGroup[menuItem];
		createMenuItem(groupDiv, menuItem, currentItem, menuFuncs.itemCount());
	});
}

function createTotals (menu, itemCount) {
	let subtotalDiv = createPageItem({
		parent: menu,
		cssId: 'subtotal'
	});
	createPageItem({
		parent: subtotalDiv,
		cssId: 'subtotal-value',
		content: '£0.00'
	});
	createPageItem({
		parent: subtotalDiv,
		cssId: 'subtotal-label',
		content: 'Subtotal'
	});

	let deliveryChargeDiv = createPageItem({
		parent: menu,
		cssId: 'delivery-charge'
	});
	createPageItem({
		parent: deliveryChargeDiv,
		cssId: 'delivery-charge-value',
		content: '£5.00'
	});
	createPageItem({
		parent: deliveryChargeDiv,
		cssId: 'delivery-charge-label',
		content: 'Delivery charge'
	});

	let totalPriceDiv = createPageItem({
		parent: menu,
		cssId: 'total-price',
	});
	createPageItem({
		parent: totalPriceDiv,
		cssId: 'total-price-value',
		content: '£5.00'
	});
	createPageItem({
		parent: totalPriceDiv,
		cssId: 'total-price-label',
		content: 'Order total'
	});
}

function createMenuItem (groupDiv, menuItem, currentItem, itemCount) {
	let description = currentItem.description;
	let price = currentItem.price;
	let size = currentItem.size;

	let itemDiv = createPageItem({
		parent: groupDiv,
		cssId: `item-${itemCount}`,
		cssClass: 'item-group',
		dataAttributes: { 'price' : price }
	});

	createQuantityPicker(itemDiv, itemCount);

	createPageItem({
		parent: itemDiv,
		cssId: `item-${itemCount}-price`,
		cssClass: 'item-price',
		content: '£' + price
	});

	let itemTitle = createPageItem({
		parent: itemDiv,
		cssClass: 'item-title',
		content: menuItem
	});

	if (size) {
		createPageItem({
			parent: itemTitle,
			type: 'span',
			cssClass: 'item-size',
			content: ` (${size})`
		});
	}

	if (description) {
		createPageItem({
			parent: itemDiv,
			cssClass: 'item-description',
			content: description
		});
	}
}

function createQuantityPicker (parent, id) {
	let quantityPicker = createPageItem({
		parent: parent,
		type: 'div',
		cssClass: 'quantity-picker'
	});

	let itemId = `item-${id}-quantity`;

	let itemQuantity = localStorage[itemId] ? localStorage[itemId] : '0';

	createPageItem({
		parent: quantityPicker,
		cssId: itemId,
		cssClass: 'item-quantity',
		content: itemQuantity
	});

	createPageItem({
		parent: quantityPicker,
		cssId: `${itemId}-down`,
		cssClass: 'quantity-change',
		content: '➖', // '-'
		listener: {
			event: 'click',
			func: () => { updateQuantities(itemId, -1) }
		}
	});

	createPageItem({
		parent: quantityPicker,
		cssId: `${itemId}-up`,
		cssClass: 'quantity-change',
		content: '➕', // '+'
		listener: {
			event: 'click',
			func: () => { updateQuantities(itemId, 1) }
		}
	});
}

function updateQuantities (id, change) {
	let itemQuantity = document.getElementById(id);
	let value = Number(itemQuantity.innerHTML);

	if (value == 0 && change < 0) return;

	let newValue = value + change;
	itemQuantity.innerHTML = newValue;

	localStorage[id] = newValue;

	updateDisplayTotal();
}

function updateDisplayTotal () {
	let totalItems = menuFuncs.itemCount();

	let subtotal = 0;

	for (let itemNumber = 1; itemNumber <= totalItems; itemNumber++) {
		let itemId   = `item-${itemNumber}`;
		let item     = document.getElementById(itemId);
		let price    = item.getAttribute('data-price');
		let quantity = document.getElementById(`${itemId}-quantity`).innerHTML;

		subtotal += (price * quantity);
	}

	let deliveryCharge = 5;
	let totalPrice = subtotal + deliveryCharge;

	let submitOrderButton = document.getElementById('submit-order');

	if (totalPrice == deliveryCharge) {
		submitOrderButton.disabled = true;
	} else {
		submitOrderButton.disabled = false;
	}

	document.getElementById('subtotal-value').innerHTML = '£' + subtotal.toFixed(2);
	document.getElementById('total-price-value').innerHTML = '£' + totalPrice.toFixed(2);
}

function submitOrder () {
	let totalItems = menuFuncs.itemCount();

	let order = {};

	for (let itemNumber = 1; itemNumber <= totalItems; itemNumber++) {
		let identifier = `item-${itemNumber}`;

		let itemQuantity = localStorage[identifier + '-quantity']
			? Number(localStorage[identifier + '-quantity'])
			: 0;

		order[identifier] = itemQuantity;
	}

	let userPhone = document.getElementById('phone-number-input').value;
	userPhone = userPhone.replace(/\D/g, '');
	userPhone = userPhone.replace(/^0/, '+44');
	order.userPhone = userPhone;

	fetch('http://localhost/submitOrder', {
		body: JSON.stringify(order),
		headers: {
			'content-type': 'application/json'
		},
		method: 'POST',
	})
	.then(response => {
		return response.json();
	})
	.then(json => {
		if (json.success) orderReceived(userPhone);
	})
	.catch(error => {
		document.write(`Couldn't submit order: ${error}.`);
	});
}

function orderReceived (userPhone) {
	let menu = document.getElementById('menu');

	while (menu.firstChild) {
		menu.removeChild(menu.firstChild);
	}

	createPageItem({
		parent: menu,
		type: 'h1',
		content: 'Order received!'
	});

	createPageItem({
		parent: menu,
		cssId: 'confirmation-message',
		content: `Thanks for your order! We've sent a confirmation text to you at ${userPhone}.`
	});
}