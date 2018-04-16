'use strict';

import { renderMenu } from './menuBuild.js';

fetchMenuData();

// To do: give renderMenu as callback
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
