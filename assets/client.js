'use strict';

getMenuData();

function getMenuData () {
	let fetchUrl = 'http://localhost:8080/menuData';

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

function renderMenu (data) {
	let menu = document.getElementById('menu');
	let menuGroups = data.groups;

	let itemCount = 0;

	Object.keys(menuGroups).forEach(group => {
		let groupDiv = createDiv(menu, `group-${group.toLowerCase()}`, 'menu-group');

		let groupTitle = document.createElement('h2');
		groupTitle.innerHTML = group;
		groupDiv.appendChild(groupTitle);

		let currentGroup = menuGroups[group];

		Object.keys(currentGroup).forEach(menuItem => {
			itemCount++;
			let currentItem = currentGroup[menuItem];
			let description = currentItem.description;
			let price = currentItem.price;

			let itemDiv = createDiv(
				groupDiv, `item-${itemCount}`, 'item-group', undefined,
				{ 'data-price' : price }
			);

			createQuantityPicker(itemDiv, itemCount);
			createDiv(itemDiv, `item-${itemCount}-price`, 'item-price', '£' + price);
			createDiv(itemDiv, undefined, 'item-title', menuItem);

			if (description)
				createDiv(itemDiv, undefined, 'item-description', description);
			});
	});

	let subtotalDiv = createDiv(menu, 'subtotal');
	createDiv(subtotalDiv, 'subtotal-value', undefined, '£0.00');
	createDiv(subtotalDiv, 'subtotal-label', undefined, 'Subtotal');

	let deliveryChargeDiv = createDiv(menu, 'delivery-charge');
	createDiv(deliveryChargeDiv, 'delivery-charge-value', undefined, '£5.00');
	createDiv(deliveryChargeDiv, 'delivery-charge-label', undefined, 'Delivery charge');

	let totalPriceDiv = createDiv(
		menu, 'total-price', undefined, undefined, { 'data-items' : itemCount }
	);
	createDiv(totalPriceDiv, 'total-price-value', undefined, '£5.00');
	createDiv(totalPriceDiv, 'total-price-label', undefined, 'Order total');
}

function createDiv (parent, itemId, itemClass, itemContent, dataAttributes) {
	let itemElement = document.createElement('div');
	if (itemId)         itemElement.setAttribute('id', itemId);
	if (itemClass)      itemElement.setAttribute('class', itemClass);
	if (itemContent)    itemElement.innerHTML = itemContent;
	if (dataAttributes) {
		for (const [key, value] of Object.entries(dataAttributes)) {
			itemElement.setAttribute(key, value);
		}
	}

	parent.appendChild(itemElement);
	return itemElement;
}

function createQuantityPicker (parent, id) {
	let quantityPicker = document.createElement('div');
	quantityPicker.setAttribute('class', 'quantity-picker');

	let itemId = `item-${id}-quantity`;

	createDiv(quantityPicker, itemId, 'item-quantity', '0');

	let quantityDownId = `${itemId}-down`;
	let quantityUpId = `${itemId}-up`;

	createDiv(quantityPicker, quantityDownId, 'quantity-change', '➖')
		.addEventListener('click', () => { updateQuantities(itemId, -1) });

	createDiv(quantityPicker, quantityUpId, 'quantity-change', '➕')
		.addEventListener('click', () => { updateQuantities(itemId, 1) });

	parent.appendChild(quantityPicker);
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
	let totalPriceDiv = document.getElementById('total-price');
	let totalItems = Number(totalPriceDiv.getAttribute('data-items'));

	let subtotal = 0;

	for (let itemNumber = 1; itemNumber <= totalItems; itemNumber++) {
		let item = document.getElementById(`item-${itemNumber}`);
		let price = item.getAttribute('data-price');
		let quantity = document.getElementById(`item-${itemNumber}-quantity`).innerHTML;

		subtotal += (price * quantity);
	}

	let totalPrice = subtotal + 5;

	document.getElementById('subtotal-value').innerHTML = '£' + subtotal.toFixed(2);
	document.getElementById('total-price-value').innerHTML = '£' + totalPrice.toFixed(2);
}