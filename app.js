const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const moment = require('moment');

const index = require('./controllers/index');
const channels = require('./controllers/channels');

const app = express();

// view engine setup
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  partialsDir: './views/partials',
  defaultLayout: 'main',
  helpers: {
    formatDate: function(nonFormattedDate) { 
      return moment(nonFormattedDate).format('ddd, MMMM DD, YYYY');
    },
    formatTime: function(nonFormattedTime) {
      return moment(nonFormattedTime, "HH:mm:ss").format('h:mm A');
    } 
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/channels', channels);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
