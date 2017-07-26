const express = require ("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require('body-parser');

var app = express();

//configure mustache with express
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static('public'));

//configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(request, response){
  response.render('form');
});
app.post('/', function(request, response){
response.render('answers', {answers: request.body });
});
app.listen(3000, function(){
  console.log('Server Farted');
});
