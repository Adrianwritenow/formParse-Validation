const express = require ("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var app = express();

//configure mustache with express
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static('public'));

//configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//configure express validator
app.use(expressValidator());

app.get('/', function(request, response) {
  response.render('form');
});
app.post('/', function(request, response){
  var schema = {
    'name':{
      notEmpty: true,
      isLength:{
        options: [{max: 100}],
        errorMessage: 'Name must not be longer than 100 characters'
      },
      errorMessage: 'Invalid Name'
    },
    'email':{
      notEmpty: true,
      isEmail:{
        errorMessage: 'Invalid Email'
      },
      isLength: {
        options:[{max: 100}],
        errorMessage: 'Email cant be longer than 100 characters'
      },
    },
    'birthyear':{
      optional:true,
      isInt:{
        options:{gt: 1899, lt:2018}
      },
      errorMessage: 'Invalid date'
    },
    'position':{
      notEmpty:true,
      matches:{
        options:[/\b(?:manager|developer|ui-desginer|graphic-desginer)\b/]
      },
      errorMessage:'invalid position'

    },
    'password':{
      notEmpty: true,
      isLength: {
        options:[{min: 8}]
      },
      errorMessage: 'Password must be at least 8 characters long'
    }
  };

  request.assert(schema);
  request.getValidationResult().then(function(result){
    if(result.isEmpty()){
      response.render('answers', {answers:request.body});
    }else{
      response.render('form',{errors:result.array()});
    }
  });
});
app.listen(3000, function(){
  console.log('Server Farted');
});
