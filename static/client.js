function displayMenu(menu){
  const menuContainer = document.getElementById('menu-container');

  const listContainer = document.createElement('ul');

  menu.forEach(function(menuItem){
    const itemContainer = document.createElement('li');
    itemContainer.innerHTML = `
      <span>${menuItem.name}</span>
      <span>${menuItem.price}</span>
    `;
    listContainer.appendChild(itemContainer);
  });

  menuContainer.appendChild(listContainer);
}

fetch('/api/menu')
  .then(function(response){
    return response.json();
  })
  .then(function(menuWrapper){
    displayMenu(menuWrapper.menu);
  });
