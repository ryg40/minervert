const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const mphfunction = require('./testax');

var app = express();

// view engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {
//   res.render('home');
// });

//

app.get('/minerdata', async (req, res) => {
  let values = await mphfunction();
  res.send({ data: values });
});

// return {
//   coinName: finalCoin,
//   coinOwned: confirmed,
//   coinOwnedVal: finalOwned,
//   coinExchange: exConfirmed,
//   coinExchangeVal: finalEx

// app.get('/', function (req, res) {
//   res.render('miner');
// });

app.get('/', function(req, res) {
  res.render('bootstrap4');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
