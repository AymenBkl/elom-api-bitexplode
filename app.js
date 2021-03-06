var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var gameRouter = require('./routes/game');
var hashRouter = require('./routes/hash');
var historyRouter = require('./routes/history');
var authRouter = require('./routes/auth');
var bitcoin = require('./routes/bitcoin');
var app = express();

const cors = require('./Middlewares/cors');
const httpsRedirect = require('./Middlewares/https.redirect');
const limiter = require('./Middlewares/ddos.limiter');
const mongoose = require('./Middlewares/mongoose');

var passport = require('passport');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('aymenxyzbkl12345678910'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(httpsRedirect);
//app.use(cors.corsWithOptions);
//app.use(limiter.limiter);
app.use('/game', gameRouter);
app.use('/hash', hashRouter);
app.use('/history', historyRouter);
app.use('/auth', authRouter);
app.use('/bitcoin',bitcoin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
