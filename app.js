//handles requires & database connection
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cons = require('consolidate');
var routes = require('./routes/index');
var datas = require('./routes/data');
var conn = require('./connection.js');
var app = express();

// view engine setup
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/data', datas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(8000);