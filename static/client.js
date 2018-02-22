function displayMenu(menu){
  const menuContainer = document.getElementById('menu-container');

  const listContainer = document.createElement('ul');

  menu.forEach(function(menuItem){
    const itemContainer = document.createElement('li');
    itemContainer.innerHTML = `
      <div class="list-item">${menuItem.name} <span>${menuItem.price}</span></div>
      <input type="number" data-key="${menuItem.key}" class="quantity" />
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

const submitButton = document.getElementById('order-form');

submitButton.addEventListener('submit', function( event ){
  event.preventDefault();

  const inputs = document.querySelectorAll('.quantity');

  const order = {}

  inputs.forEach(function(input){

    const key = input.dataset.key;
    const valueAsNumber = input.valueAsNumber;
    if(valueAsNumber){
      order[key] = valueAsNumber;
    }
  });

  fetch('/api/orders', {
    body: JSON.stringify(order),
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(function(response){
    if(response.status === 201){
      alert('order accepted');
    } else {
      alert('something went horribly wrong!');
    }
  })
});

function responseHandler(response){

}
