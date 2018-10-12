function database() {
  let placedOrders = {};
  const menu = {
    1: {
      id: 1,
      name: "Taro Dumplings",
      price: 5
    },
    2: {
      id: 2,
      name: "Steamed Egg (v)",
      price: 5
    },
    3: {
      id: 3,
      name: "XO Bone Marrow Cornish King Scallop",
      price: 7
    },
    4: {
      id: 4,
      name: "Sweet & Sour Balsamic Aubergine",
      price: 7
    },
    5: {
      id: 5,
      name: "Mapo Tofu (v)",
      price: 12
    },
    6: {
      id: 6,
      name: "Chilli Egg Drop Crab & Salmon Roe",
      price: 18
    },
    7: {
      id: 7,
      name: "Char Siu Iberico Pork",
      price: 20
    },
    8: {
      id: 8,
      name: "Black Mountain Goose",
      price: 30
    },

    9: {
      id: 9,
      name: "Strawberry cheesecake",
      price: 6
    },
    10: {
      id: 10,
      name: "Soufflé",
      price: 6
    }
  };

  function getMenu() {
    return menu;
  }

  function createNewOrder(order) {
    let newID;
    const length = Object.keys(placedOrders).length
    length === 0
      ? (newID = 1)
      // : (newID = Object.keys(placedOrders).length + 1);
      : newID=Math.max(...Object.keys(placedOrders))+1

    const foodCost = order
      .map(eachOrder => eachOrder.price * eachOrder.number)
      .reduce((acc, item) => acc + item);
    const deliveryCost = foodCost * 0.1;
    const totalCost = foodCost * 1.1;

    return (placedOrders[newID] = {
      id: newID,
      order: order,
      cost: {
        foodCost: foodCost,
        deliveryCost: deliveryCost.toFixed(2),
        totalCost: totalCost.toFixed(2)
      }
    });
  }

  function listAllOrders() {
    return placedOrders;
  }

  return { getMenu, createNewOrder, listAllOrders };
}

module.exports = { database };
