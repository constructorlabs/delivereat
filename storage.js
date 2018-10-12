const menu = {
  1: {
    id: 1,
    name: "Cheese Fondue",
    price: 6,
    category: "gluttony",
    type: "main",
    image: "https://du7ybees82p4m.cloudfront.net/565f0ac7995782.71229636.jpg?width=1820&height=1023"
  },
  2: {
    id: 2,
    name: "Tartiflette",
    price: 6,
    category: "gluttony",
    type: "main",
    image: "https://www.lavenderandlovage.com/wp/wp-content/uploads/2015/02/Tartiflette-15-1024x711.jpg"
  },
  3: {
    id: 3,
    name: "Raclette",
    price: 6,
    category: "gluttony",
    type: "main",
    image: "https://www.broadsheet.com.au/media/cache/08/f4/08f4d877f83378a81f855ecf811acdcc.jpg"
  },
  4: {
    id: 4,
    name: "Steak Hache",
    price: 6,
    category: "gluttony",
    type: "main",
    image: "https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg"
  },
  5: {
    id: 5,
    name: "Iles flottantes",
    price: 6,
    category: "gluttony",
    type: "dessert",
    image: "https://www.cookomix.com/wp-content/uploads/2017/11/iles-flottantes-thermomix-800x600.jpg"
  },
  6: {
    id: 6,
    name: "Creme Brulee",
    price: 6,
    category: "gluttony",
    type: "dessert",
    image: "https://du7ybees82p4m.cloudfront.net/334_5362628d3d4fa.jpg?width=1820&height=1023"
  },
  7: {
    id: 7,
    name: "Creme Caramel",
    price: 7,
    category: "gluttony",
    type: "dessert",
    image: "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/classic_crme_caramel_44792_16x9.jpg"
  },
  8: {
    id: 8,
    name: "Salmon mousse",
    price: 6,
    category: "gluttony",
    type: "starter",
    image: "http://www.insidethekaganoffkitchen.com/2010/04/08/salmon-mousse/salmonterrine2/"
  },
  9: {
    id: 9,
    name: "Foie Gras",
    price: 6,
    category: "gluttony",
    type: "starter",
    image: "https://s23991.pcdn.co/wp-content/uploads/2010/12/seared-foie-gras-recipe.jpg"
  },
  10: {
    id: 10,
    name: "Onion Soup",
    price: 6,
    category: "gluttony",
    type: "starter",
    image: "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fslow-cooker-french-onion-soup-ck-1000.jpg"
  }
};


function getMenu(){
  return Object.values(menu);
}

module.exports = {
  getMenu
}
