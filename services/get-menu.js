function getMenuFromDb(db){
  return db.many('SELECT * FROM menu')
    .then(function(result){
      return result.map(function({id, item_name, price}){

        return {
          id,
          name: item_name,
          price
        }
      });
    })
    .catch(function(error){
      console.log(error);
      return null;
    });
}

module.exports = getMenuFromDb;
