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
			document.write(`Couldn't get ${fetchUrl}: ${response}`);
		});
}

function renderMenu (data) {
	let menu = document.getElementById('menu');
	let menuGroups = data.groups;

	Object.keys(menuGroups).forEach(group => {
		let groupDiv = createMenuDiv(menu, `group-${group.toLowerCase()}`, 'menu-group');

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

			createMenuDiv(itemDiv, undefined, 'item-price', price);
			createMenuDiv(itemDiv, undefined, 'item-title', menuItem);

			if (description)
				createMenuDiv(itemDiv, undefined, 'item-description', description);

			groupDiv.appendChild(itemDiv);
		});
	});
}

function createMenuDiv (parent, itemId, itemClass, itemText) {
	let itemElement = document.createElement('div');
	if (itemId) itemElement.setAttribute('id', itemId);
	itemElement.setAttribute('class', itemClass);
	if (itemText) itemElement.innerHTML = itemText;
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

	createMenuDiv(itemDiv, 'item-price', price);
	createMenuDiv(itemDiv, 'item-title', menuItem);

	if (description) {
		createMenuDiv(itemDiv, 'item-description', description);
	}

	groupDiv.appendChild(itemDiv);
}