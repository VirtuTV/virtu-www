'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _home = require('../controllers/home');

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 3000;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use((0, _cookieParser2.default)()

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

app.listen(PORT, function () {
  console.log('App is listening on port ' + PORT);
});