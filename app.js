
var express = require('express');
var app = express();
var credentials = require('./config/credentials.js');
var environments = require('./config/environments.js');

var fs = require('fs');
var path = require('path');
var flash  = require('connect-flash');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var authorizations = require('./config/middlewares/auth.js');

var mongoose = require('mongoose');
var passport = require('passport');

var config_db = require('./config/databases.js');
mongoose.connect(config_db.url); // connect to our database

var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file);
});

app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//setting up session secret and session store.
//Default mongoStore is leaky and not ideal for production. Hence using MongoStre
app.use(session({
  secret: credentials['session_secret'],
  store: new mongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./config/routes.js')(app, passport, authorizations); // load our routes and pass in our app and fully configured passport

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


//Launch the server
var port = environments[environments['environment']]['port'];
app.listen(port);
console.log("Server is starting at Port "+port);

