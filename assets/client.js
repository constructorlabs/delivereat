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
			let currentItem = currentGroup[menuItem];
			let description = currentItem.description;
			let price = '£' + currentItem.price;

			let itemDiv = document.createElement('div');
			itemDiv.setAttribute('class', 'item-group');

			createQuantityPicker(itemDiv, ++itemCount);
			createDiv(itemDiv, undefined, 'item-price', price);
			createDiv(itemDiv, undefined, 'item-title', menuItem);

			if (description)
				createDiv(itemDiv, undefined, 'item-description', description);

			groupDiv.appendChild(itemDiv);
		});
	});
}

function createQuantityPicker (parent, id) {
	let quantityPicker = document.createElement('div');
	quantityPicker.setAttribute('class', 'quantity-picker');

	let itemId = `item-${id}-quantity`;

	createDiv(quantityPicker, itemId, 'item-quantity', '0');

	let quantityDownId = `${itemId}-down`;
	let quantityUpId = `${itemId}-up`;

	createDiv(quantityPicker, quantityDownId, 'quantity-change', '➖')
		.addEventListener('click', () => { quantityDown(itemId) });

	createDiv(quantityPicker, quantityUpId, 'quantity-change', '➕')
		.addEventListener('click', () => { quantityUp(itemId) });

	parent.appendChild(quantityPicker);
}

function createDiv (parent, itemId, itemClass, itemContent) {
	let itemElement = document.createElement('div');
	if (itemId) itemElement.setAttribute('id', itemId);
	itemElement.setAttribute('class', itemClass);
	if (itemContent) itemElement.innerHTML = itemContent;
	parent.appendChild(itemElement);
	return itemElement;
}

function createMenuGroup (group) {
	let groupDiv = document.createElement('div');
	groupDiv.setAttribute('id', `group-${group.toLowerCase()}`);
	groupDiv.setAttribute('class', 'menu-group');

	let currentItem = currentGroup[menuItem];
	let description = currentItem.description;
	let price = '£' + currentItem.price;

	let itemDiv = document.createElement('div');
	itemDiv.setAttribute('class', 'item-group');

	createDiv(itemDiv, 'item-price', price);
	createDiv(itemDiv, 'item-title', menuItem);

	if (description) {
		createDiv(itemDiv, 'item-description', description);
	}

	groupDiv.appendChild(itemDiv);
}

function quantityUp (id) {
	let itemQuantity = document.getElementById(id);
	itemQuantity.innerHTML = Number(itemQuantity.innerHTML) + 1;
}

function quantityDown (id) {
	let itemQuantity = document.getElementById(id);

	if (Number(itemQuantity.innerHTML) > 0) {
		itemQuantity.innerHTML = Number(itemQuantity.innerHTML) - 1;
	}
}