function menu(){

const menuClosure = {
    1: {
      id:1,
      title: "Strawberry cheesecake",
      price: 6,
      image: 'strawberrycheesecake.jpeg',
      description: 'A medium sized Strawberry Cheesecake',
      category: 'dessert'
    },
    2: {
      id:2,
      title: 'Blueberry cheesecake',
      price: 6.50,
      image: 'blueberry cheesecake.jpeg',
      description: 'A medium sized Blueberry Cheesecake',
      category: 'dessert'
    },
    3:{
        id:3,
        title:'Chocolate cheesecake',
        price: 6.50,
        image: 'chocolate cheesecake.jpeg',
        description: 'A medium sized Chocolate Cheesecake',
        category: 'dessert'
  },
  4:{
    id:4,
    title:'chesse',
    price: 6.50,
    image: 'chocolate cheesecake.jpeg',
    description: 'cheese',
    category: 'main'
  },
  5:{
    id:5,
    title:'Lamb Kebab',
    price: 11.50,
    image: 'chocolate cheesecake.jpeg',
    description: 'A nice kebab',
    category: 'main'
  },
  6:{
    id:6,
    title:'flatiron steak',
    price: 10.50,
    image: 'chocolate cheesecake.jpeg',
    description: 'A nice steak',
    category: 'main'
}

}
return {
      getAllItems(){
      return menuClosure;
    },

    getItem(itemId){
    return menuClosure[itemId]
    },
}
}



function orders(){
  const orderClosure = {} // order will start as empty since orders need to be placed
  //think I will need an order id
  return {
    getAllOrders(){
    return orderClosure;
      },

    getOrder(orderId){
    return orderClosure[orderId]
      },

    createNewOrder(newOrder){
      const orderKeys = Object.keys(orderClosure);
      const highestiD = Math.max(...orderKeys);
      const newId = highestiD + 1;
        orders = Object.assign({},orderClosure,{[newId]:newOrder})
        return orderClosure
      },

      deleteStudent(orderId){
        delete orderClosure[orderId]
      }
    }
  }



  module.exports = {
      menu,
      orders
  }