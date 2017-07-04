'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _sendgrid = require('sendgrid');

var _sendgrid2 = _interopRequireDefault(_sendgrid);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressFlash = require('express-flash');

var _expressFlash2 = _interopRequireDefault(_expressFlash);

var _home = require('./controllers/home');

var _home2 = _interopRequireDefault(_home);

var _team = require('./controllers/team');

var _team2 = _interopRequireDefault(_team);

var _faq = require('./controllers/faq');

var _faq2 = _interopRequireDefault(_faq);

var _crowdsale = require('./controllers/crowdsale');

var _crowdsale2 = _interopRequireDefault(_crowdsale);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var W = new Web3();
// console.log(W.eth.getBalance);

var app = (0, _express2.default)();
var PORT = 3000;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use((0, _expressFlash2.default)()

// Express handlebars 
);var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.set('views', _path2.default.join(__dirname, 'views')

// Static assets in /public
);app.use(_express2.default.static('public')

// Security Middleware
);var helmet = require('helmet');
app.use(helmet()

// app.use(morgan('combined'))

// Controllers 
);app.use('/', _home2.default);
app.use('/', _team2.default);
app.use('/', _faq2.default);
app.use('/', _crowdsale2.default);

app.listen(PORT, function () {
  console.log('App is listening on port ' + PORT);
});