function menu(){

    const menu = {
      
      burgers: {
        1: {
          id: 1,
          name: "Regular Burger",
          price: 8.0,
          quantity: 1
        },
        2: {
          id: 2,
          name: "Irregular Burger",
          price: 9.5,
          quantity: 1
        },
        3: {
          id: 3,
          name: "SuperBurger",
          price: 10.5,
          quantity: 1
        },
        4: {
          id: 4,
          name: "IncrediBurger",
          price: 12.0,
          quantity: 1
        }
      },
  
      fries: {
        5:{
          id: 5,
          name: "Regular Fries",
          price: 2.5,
          quantity: 1
        },
        6:{
          id: 6,
          name: "Spicy Fries",
          price: 3.5,
          quantity: 1
        },
        7:{
          id: 7,
          name: "Cheese Fries",
          price: 4.5,
          quantity: 1
        },
      },

      extras: {
        8:{
          id: 8,
          name: "Chipotle Mayo",
          price: 1,
          quantity: 1
        },
        9:{
          id: 9,
          name: "Extra Avocado",
          price: 1.5,
          quantity: 1
        },
        10:{
          id: 10,
          name: "Extra Cheese",
          price: 1.5,
          quantity: 1
        },
        11:{
          id: 11,
          name: "Hash Brown",
          price: 2,
          quantity: 1
        },
        12:{
          id: 12,
          name: "Double Patty",
          price: 3,
          quantity: 1
        },
      }
    };
  
    const menuMethods ={
      retrieveMenu(){
        return menu;
      }
    }
  
    return menuMethods;
  }

  module.exports = menu;