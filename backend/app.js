const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const rateLimit = require("express-rate-limit");

let app = express();

const Configstore = require('configstore');
const conf = new Configstore(require('./package.json').name,
  {
   images: []
  },
  {
    configPath: './store/.site_settings.json'
  }
)

let Manager = require('./manager');
let manager = new Manager(conf);

// sessions setup
app.use(session({
   secret: 'keyboard cat',
   cookie: { maxAge: 3360000 },
   resave: false,
   saveUninitialized: true
}));

// parsing post
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const dashboardRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 hour window
  max: process.env.LOGIN_RATE_LIMIT,
  message:
    "Error: Rate limited"
});

app.use('/dashboard', dashboardRateLimiter, require('./routes/dashboard')(manager));
app.use('/images', require('./routes/images')(manager));

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
})

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
