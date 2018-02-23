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
