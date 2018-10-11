const beans = {
  1: {
    id: 1,
    name: "Finca Don Carlos",
    origin: "Bolivia",
    region: "Caranavi",
    description: "Candied plums and chocolate with soft acidity and caramel-like body",
    process: "Honey Process",
    variety: "Catuai"
  },
  2: {
    id: 2,
    name: "Finca El Mirador",
    origin: "Colombia",
    region: "Los Olivos, Huila",
    description: "Plums and nectarines with juicy acidity and medium body",
    process: "Traditional Washed Process",
    variety: "Caturra and Colombia"
  },
  3: {
    id: 3,
    name: "Finca Telia - Herbazu",
    origin: "Costa Rica",
    region: "Lourdes de Naranjo",
    description: "Key-lime pie and toffee-apples with medium acidity and medium body",
    process: "Red Honey Process",
    variety: "Villa Sarchi"
  },
  4: {
    id: 4,
    name: "Raja Batak",
    origin: "Indonesia",
    region: "Lake Toba, North Sumatra",
    description: "Leafy tobacco and red fruit with fruity acidity and medium to full body",
    process: "Honey Process",
    variety: "Various Cultivars"
  },
  5: {
    id: 5,
    name: "Gatura",
    origin: "Kenya",
    region: "Nyeri County",
    description: "Black and red currants with fresh acidity and juicy body",
    process: "Traditional Washed Process",
    variety: "SL28 and SL34"
  }
};

const menu = {
  1: {
    id: 1,
    name: "Espresso",
    description: "Single shot, 30ml",
    price: 2.00
  },
  2: {
    id: 2,
    name: "Ristretto",
    description: "Concentrated espresso, 22ml",
    price: 2.00
  },
  3: {
    id: 3,
    name: "Macchiato",
    description: "60ml espresso + a dab of milk foam",
    price: 2.20
  },
  4: {
    id: 4,
    name: "Cortado",
    description: "60ml espresso + 30ml milk foam",
    price: 2.40
  },
  5: {
    id: 5,
    name: "Cappuccino",
    description: "60ml espresso + 60ml steamed milk + 60ml milk foam",
    price: 2.50
  },
  6: {
    id: 6,
    name: "Americano",
    description: "60ml espresso + 90ml hot water",
    price: 2.30
  },
  7: {
    id: 7,
    name: "Flat White",
    description: "60ml espresso + 120ml steamed milk",
    price: 2.50
  },
  8: {
    id: 8,
    name: "Latte",
    description: "60ml espresso + 180ml steamed milk + 2ml milk foam",
    price: 2.50
  },
  9: {
    id: 9,
    name: "Mocha",
    description: "60ml espresso + 60ml chocolate + 30ml steamed milk",
    price: 2.90
  },
  10: {
    id: 10,
    name: "Extra Shot",
    description: "",
    price: 0.50
  },
  11: {
    id: 11,
    name: "Non-dairy Milk",
    description: "Oat, almond or coconut",
    price: 0.50
  }
};

const orders = {};

function getMenu() {
  return menu;
}

function getBeans() {
  return beans;
}

function postOrder(order) {
  const newId = (Object.keys(orders).length) ? Math.max(...Object.keys(orders)) + 1 : 1;
  const date = new Date();
  const orderData = {'orderId': newId, 'orderStatus': 'new', 'placedAt': date.toLocaleString(), 'order': order};
  orders[newId] = orderData;
  return orderData;
}

function patchOrder(orderId, newStatus) {
  orders[orderId].orderStatus = newStatus.orderStatus;
  return orders[orderId];
}

function getOpenOrders() {
  let openOrders = {};
  for (orderId in orders) {
    if (orders[orderId].orderStatus === 'new') {
      openOrders = Object.assign(openOrders, {[orderId]: orders[orderId]});
    }
  }
  return openOrders;
}

module.exports = {getMenu, getBeans, postOrder, patchOrder, getOpenOrders};

//NEW ORDER:
//[{"drinkId": 1, "extraShot": false, "nonDairy": "none"},{"drinkId": 2, "extraShot": true, "nonDairy": "none"}]

//STATUS UPDATE:
//{"orderStatus": "completed"}
