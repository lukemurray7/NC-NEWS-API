if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var db = config.DB[process.env.NODE_ENV];
var PORT = config.PORT[process.env.NODE_ENV] || process.env.PORT;
var apiRouter = require('./routes/api');
var cors = require('cors');


mongoose.connect(db, function (err) {
  if (!err) {
    console.log(`connected to the Database: ${db}`);
  } else {
    console.log(db)
    console.log(process.env.NODE_ENV)
    console.log(`error connecting to the Database ${db} ${err}`);
  }
});
// can put all the middleware in a seperate file

app.set('view engine', 'ejs');


app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.get('/', function (request, response) {
  response.render('pages/index');
});

app.use('/*', function (request, response) {
  response.status(404).send({reason: 'ROUTE NOT FOUND'});
});

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});


// can put all the error handlers in a seperate file


app.use(function (error, request, response, next) {
  if (error.name === 'CastError') {
    return response.status(400).send({
      reason: `No id ${error.value} found`,
      stack_trace: error
    });
  }
  return next(error);
});

app.use(function (error, request, response) {
  return response.status(500).send({error});
});