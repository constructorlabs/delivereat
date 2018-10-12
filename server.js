const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const menu = {
  1:{
    id:1,
    name: "Taro Dumplings",
    price: 5
  },
  2:{
    id:2,
    name: "Steamed Egg (v)",
    price: 5
  },
  3:{
    id:3,
    name: "XO Bone Marrow Cornish King Scallop",
    price: 7
  },
  4:{
    id:4,
    name:"Sweet & Sour Balsamic Aubergine",
    price: 7
  },
  5:{
    id:5,
    name: "Mapo Tofu (v)",
    price: 12
  },
  6: {
    id:6,
    name: "Chilli Egg Drop Crab & Salmon Roe",
    price: 18
  },
  7:{
    id:7,
    name: "Char Siu Iberico Pork",
    price: 20
  },
  8:{
    id:8,
    name: "Black Mountain Goose",
    price: 30
  },

  9: {
    id: 9,
    name: "Strawberry cheesecake",
    price: 6
  },
  10:{
     id: 10,
     name: "Soufflé",
     price: 6
   }
};

app.get('/', function(req, res){
  res.render('index');
});
app.get('/api/menu', (req, res) => {
  res.json(menu)
})

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
