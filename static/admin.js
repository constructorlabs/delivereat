function renderOrders(orders){
  const ordersContainer = document.getElementById('orders');

  const listOfListsContainer = document.createElement('ol');

  orders.forEach(function(order){
    const outerListItemContainer = document.createElement('li');
    listOfListsContainer.appendChild(outerListItemContainer);

    const orderContainer = document.createElement('ul');

    order.forEach(function(orderItem){
      const itemContainer = document.createElement('li');
      itemContainer.innerHTML = `
        <div class="list-item">${orderItem.name}
          <span>${orderItem.price}</span>
          <span>${orderItem.quantity}</span>
        </div>
      `;
      orderContainer.appendChild(itemContainer);
    });
    listOfListsContainer.appendChild(orderContainer);
  });

  ordersContainer.appendChild(listOfListsContainer);
}

fetch('/api/orders')
  .then(function(response){
    return response.json();
  })
  .then(function(orders){
    renderOrders(orders);
  });
